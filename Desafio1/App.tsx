import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';

type Champion = {
  id: string; // ex: "Aatrox"
  name: string; // ex: "Aatrox"
  title: string; // ex: "the Darkin Blade"
};

const LOCALE = 'pt_BR';

export default function App(): React.ReactElement {
  const [version, setVersion] = useState<string | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        // 1) obter a versão mais recente
        const vRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
          headers: { 'Accept': 'application/json', 'Accept-Language': 'pt-BR' },
        });
        if (!vRes.ok) throw new Error('Falha ao buscar versões');
        const versions: string[] = await vRes.json();
        const latest = versions && versions.length ? versions[0] : null;
        if (!latest) throw new Error('Nenhuma versão disponível');
        if (!mounted) return;
        setVersion(latest);

        // 2) obter lista de campeões
        const champsRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/${LOCALE}/champion.json`,
          { headers: { 'Accept': 'application/json', 'Accept-Language': 'pt-BR' } }
        );
        if (!champsRes.ok) throw new Error('Falha ao buscar campeões');
        const champsJson = await champsRes.json();
        const data = champsJson?.data || {};
        const list: Champion[] = Object.keys(data).map((k) => ({
          id: data[k].id,
          name: data[k].name,
          title: data[k].title,
        }));
        if (!mounted) return;
        setChampions(list);
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message ?? String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const renderItem = ({ item }: { item: Champion }) => {
    const uri = version
      ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.id}.png`
      : undefined;

    return (
      <View style={styles.item}>
        {uri ? (
          <Image source={{ uri }} style={styles.avatar} resizeMode="contain" />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]} />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Desafio I — Campeões League of Legends (API com TypeScript)</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2f95dc" />
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>Erro: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={champions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          initialNumToRender={12}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versão: {version ?? '—'}</Text>
        <Text style={styles.footerNote}>Fonte: Data Dragon (ddragon.leagueoflegends.com)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginVertical: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { color: 'red' },
  list: { paddingHorizontal: 12, paddingBottom: 20 },
  item: { flexDirection: 'row', paddingVertical: 8, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  avatar: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f2f2f2' },
  avatarPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  title: { fontSize: 12, color: '#666', marginTop: 2 },
  footer: { padding: 10, borderTopWidth: 0.5, borderTopColor: '#eee' },
  footerText: { fontSize: 12, color: '#333' },
  footerNote: { fontSize: 11, color: '#666', marginTop: 2 },
});
