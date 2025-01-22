-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    is_club BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    club_id UUID REFERENCES clubs(id) NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, club_id)
);

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Enable insert for users"
    ON users FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Clubs policies
CREATE POLICY "Enable insert for clubs"
    ON clubs FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view clubs"
    ON clubs FOR SELECT
    USING (true);

CREATE POLICY "Clubs can update their own profile"
    ON clubs FOR UPDATE
    USING (auth.uid() = id);

-- Memberships policies
CREATE POLICY "Enable insert for memberships"
    ON memberships FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.uid() = club_id);

CREATE POLICY "Users can view their own memberships"
    ON memberships FOR SELECT
    USING (auth.uid() = user_id OR auth.uid() = club_id);

CREATE POLICY "Clubs can manage their memberships"
    ON memberships FOR ALL
    USING (auth.uid() = club_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE clubs;
ALTER PUBLICATION supabase_realtime ADD TABLE memberships;

-- Add default roles
INSERT INTO auth.roles (role)
VALUES ('authenticated')
ON CONFLICT DO NOTHING; 