import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
  champion?: any;
  version?: string;
  locale?: string;
};

export default function Details() {
  const route = useRoute();
  const params = (route.params || {}) as RouteParams;
  const champ = params.champion;
  const version = params.version;
  const locale = params.locale || 'pt_BR';

  if (!champ) return null;

  return (
    <ScrollView style={{ flex: 1 }}>
      <Card>
  <Card.Cover source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg` }} />
        <Card.Content>
          <Title>{champ.name} — {champ.title}</Title>
          <Paragraph>{champ.blurb}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
