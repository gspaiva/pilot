import React from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-json-tree'

import {
  Card,
  CardTitle,
  CardContent,
} from 'former-kit'

import style from './style.css'

const TreeView = ({ data, title }) => (
  <Card>
    <CardTitle
      title={title}
      className={style.title}
    />
    <CardContent className={style.content}>
      <Tree
        data={data}
        theme={{
          arrowSign: () => ({ className: style.arrow }),
          tree: () => ({ className: style.tree }),
          valueText: () => ({ className: style.value }),
        }}
        getItemString={() => null} // remove '[] Array' from key props on tree
        hideRoot
      />
    </CardContent>
  </Card>
)

TreeView.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line
}

export default TreeView
