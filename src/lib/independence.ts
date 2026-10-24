/** Destination d'une page d'après son identifiant (uk-*, esta*, us-*, ca*, au*, nz*, etias), pour la mention d'indépendance. */
export type Dest = 'uk' | 'us' | 'ca' | 'au' | 'nz' | 'eu';
export const destOf = (id: string): Dest | undefined =>
  id.startsWith('uk') ? 'uk' : id.startsWith('esta') || id.startsWith('us') ? 'us' : id.startsWith('ca') ? 'ca' : id.startsWith('au') ? 'au' : id.startsWith('nz') ? 'nz' : id === 'etias' ? 'eu' : undefined;
