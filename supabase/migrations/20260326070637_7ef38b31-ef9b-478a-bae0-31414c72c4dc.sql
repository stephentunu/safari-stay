
-- Tighten fraud_flags INSERT: only allow via service role / triggers, not direct user inserts
DROP POLICY "System can insert fraud flags" ON public.fraud_flags;

-- No INSERT policy needed since triggers use SECURITY DEFINER which bypasses RLS
