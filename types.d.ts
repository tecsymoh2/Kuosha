/* Minimal types for the Supabase client loaded from the CDN <script> tag. */
interface SbError { message: string; code?: string }
interface SbResult<T = any> { data: T; error: SbError | null }
interface SbQuery extends PromiseLike<SbResult> {
  insert(row: Record<string, unknown>): SbQuery;
  update(row: Record<string, unknown>): SbQuery;
  select(cols?: string): SbQuery;
  eq(col: string, val: string): SbQuery;
  order(col: string, opts?: { ascending: boolean }): SbQuery;
  limit(n: number): SbQuery;
}
interface SbClient {
  from(table: string): SbQuery;
  rpc(fn: string): PromiseLike<SbResult<boolean>>;
  auth: {
    getSession(): Promise<{ data: { session: { user: { email?: string; user_metadata?: { username?: string } } } | null } }>;
    signInWithPassword(c: { email: string; password: string }): Promise<{ error: SbError | null }>;
    signOut(): Promise<unknown>;
  };
  storage: { from(bucket: string): {
    upload(path: string, file: File, opts: { contentType: string; upsert: boolean }): Promise<{ error: SbError | null }>;
    createSignedUrl(path: string, seconds: number): Promise<{ data: { signedUrl: string }; error: SbError | null }>;
  } };
}
interface Window { supabase?: { createClient(url: string, key: string): SbClient }; _sb?: SbClient }
