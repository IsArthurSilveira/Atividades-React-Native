export async function getLatestVersion(): Promise<string> {
  const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  if (!res.ok) throw new Error('Failed to fetch versions');
  const data: string[] = await res.json();
  return data[0];
}

export async function getChampions(version: string, locale = 'pt_BR'): Promise<any[]> {
  // locale example: 'pt_BR', 'en_US'
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch champions');
  const json = await res.json();
  // json.data is an object mapping id -> champion
  const champs = Object.values(json.data || {});
  return champs as any[];
}
