import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Appbar, Card, ActivityIndicator } from 'react-native-paper';
import { getLatestVersion, getChampions } from '../api/ddragon';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState('');
  const [champions, setChampions] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [locale] = useState('pt_BR');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
  const v = await getLatestVersion();
  setVersion(v);
  const champs = await getChampions(v, locale);
      setChampions(champs as any[]);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card style={{ margin: 8 }} onPress={() => navigation.navigate('Details', { champion: item, version })}>
      <Card.Title title={item.name} subtitle={item.title} />
      <Card.Cover source={{ uri: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.image.full}` }} />
    </Card>
  );

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator animating size={48} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Desafio2 - LOL React Native Paper" subtitle={version} />
      </Appbar.Header>
      <FlatList
        data={champions}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}
