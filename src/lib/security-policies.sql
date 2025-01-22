-- Politiques pour la table users
CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can delete their own account"
ON users FOR DELETE
USING (auth.uid() = id);

-- Politiques pour la table clubs
CREATE POLICY "Clubs can insert their own data"
ON clubs FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Club owners can delete their club"
ON clubs FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM memberships 
        WHERE club_id = id 
        AND user_id = auth.uid() 
        AND role = 'owner'
    )
);

-- Politiques pour la table memberships
CREATE POLICY "Users can request membership"
ON memberships FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Club owners can manage memberships"
ON memberships FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM memberships m2
        WHERE m2.club_id = club_id 
        AND m2.user_id = auth.uid() 
        AND m2.role = 'owner'
    )
);

-- Politique pour permettre aux clubs de voir leurs membres
CREATE POLICY "Clubs can view their members"
ON users FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM memberships
        WHERE club_id IN (
            SELECT club_id FROM memberships
            WHERE user_id = auth.uid() AND role = 'owner'
        )
        AND user_id = users.id
    )
); 