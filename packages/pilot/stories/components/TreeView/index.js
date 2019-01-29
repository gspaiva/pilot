import React from 'react'

import Section from '../../Section'
import TreeView from '../../../src/components/TreeView'

const metadata = {
  birth_year: '19BBY',
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  eye_color: 'blue',
  films: [
    {
      director: 'Irvin Kershner',
      episode_id: 5,
      opening_crawl: 'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1980-05-17',
      title: 'The Empire Strikes Back',
    },
  ],
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  mass: '77',
  name: 'Luke Skywalker',
  skin_color: 'fair',
}

const TreeViewExample = () => (
  <Section>
    <TreeView
      data={metadata}
      title="Metadata"
    />
  </Section>
)

export default TreeViewExample
