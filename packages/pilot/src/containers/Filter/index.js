import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardActions,
  CardContent,
  CardSection,
  Button,
  Tag,
  Row,
  Col,
  CheckboxGroup,
  Spacing,
} from 'former-kit'

import Form from 'react-vanilla-form'

import ChevronDown32 from 'emblematic-icons/svg/ChevronDown32.svg'
import ChevronUp32 from 'emblematic-icons/svg/ChevronUp32.svg'

import {
  anyPass,
  equals,
  flatten,
  isEmpty,
  isNil,
  unless,
  is,
  of,
  join,
  mergeDeepLeft,
  pipe,
  values,
} from 'ramda'

import compileTags from './compileTags'
import style from './style.css'

const isNilOrEmpty = anyPass([isNil, isEmpty])

const getFilters = pipe(
  mergeDeepLeft,
  values,
  flatten
)

const ensureArray = unless(
  is(Array),
  of
)

class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: true,
      query: props.query,
    }

    this.renderChildrenInput = this.renderChildrenInput.bind(this)
    this.handleToogeMoreFilters = this.handleToogeMoreFilters.bind(this)
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this)
    this.handleFiltersChange = this.handleFiltersChange.bind(this)
  }

  componentWillReceiveProps ({ query }) {
    if (!equals(query, this.state.query)) {
      this.setState({ query })
    }
  }

  handleToogeMoreFilters () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleFiltersSubmit (filters) {
    this.setState({
      collapsed: true,
    })

    this.props.onChange(filters)
  }

  handleFiltersChange (query) {
    this.setState({ query })
  }

  renderChildrenInput (input, index) {
    return React.cloneElement(input, {
      className: style.search,
      disabled: this.props.disabled,
      key: `${input.props.name}-${index}`,
    })
  }

  renderToolbar () {
    const {
      children,
      onClear,
      options,
      query: originalFilters,
      t,
    } = this.props

    const {
      collapsed,
      query: currentFilters,
    } = this.state

    const filtersChanged = !equals(originalFilters, currentFilters)

    return (
      <CardActions>
        {ensureArray(children).map(this.renderChildrenInput)}
        {!isNilOrEmpty(options) &&
          <Button
            disabled={this.props.disabled}
            relevance="low"
            fill="outline"
            iconAlignment="end"
            icon={collapsed
              ? <ChevronDown32 width={16} height={16} />
              : <ChevronUp32 width={16} height={16} />
            }
            onClick={this.handleToogeMoreFilters}
          >
            {t('components.filter.more')}
          </Button>
        }
        <Spacing size="flex" />
        <Button
          relevance={
            filtersChanged
              ? 'normal'
              : 'low'
          }
          onClick={onClear}
          fill="outline"
          disabled={this.props.disabled}
        >
          {t('components.filter.reset')}
        </Button>

        <Button
          relevance={
            filtersChanged
              ? 'normal'
              : 'low'
          }
          disabled={!filtersChanged || this.props.disabled}
          type="submit"
          fill="gradient"
        >
          {t('components.filter.apply')}
        </Button>
      </CardActions>
    )
  }

  renderOptions () {
    const {
      collapsed,
      query,
    } = this.state

    const {
      options,
      query: {
        filters,
      },
    } = this.props

    if (isNilOrEmpty(options) || collapsed) {
      return null
    }

    const selectedFilters = getFilters(filters, query.filters)

    return (
      <CardContent>
        <CardSection>
          <CardContent>
            <fieldset name="filters">
              <Row flex>
                {options.map(({ items, key, name }) => (
                  <Col key={name}>
                    <div className={style.filtersTitle}>
                      {name}
                    </div>
                    <CheckboxGroup
                      columns={
                        items.length > 6
                        ? 2
                        : 1
                      }
                      disabled={this.props.disabled}
                      name={key}
                      options={items}
                      value={selectedFilters}
                    />
                  </Col>
                ))}
              </Row>
            </fieldset>
          </CardContent>
        </CardSection>
      </CardContent>
    )
  }

  renderTags () {
    const {
      collapsed,
      query: {
        filters: localFilters,
      },
    } = this.state

    const {
      options,
      query: {
        filters: urlFilters,
      },
      t,
    } = this.props

    const filters = mergeDeepLeft(urlFilters, localFilters)

    if (!collapsed || isNilOrEmpty(filters)) {
      return null
    }

    const tags = compileTags(options, filters)

    return (
      <CardContent className={style.selectedOptionsTags}>
        <span className={style.selectedOptionsTitle}>
          {t('components.filter.filtering_by')}&nbsp;
        </span>
        {tags.map(({ items, key, name }) => (
          !isNilOrEmpty(items) &&
            <Tag key={key}>
              <strong>{name}</strong>: {join(', ', items)}
            </Tag>
        ))}
      </CardContent>
    )
  }

  render () {
    return (
      <Card className={style.allowOverflow}>
        <Form
          data={this.state.query}
          onChange={this.handleFiltersChange}
          onSubmit={this.handleFiltersSubmit}
        >
          {this.renderToolbar()}
          {this.renderOptions()}
          {this.renderTags()}
        </Form>
      </Card>
    )
  }
}

Filters.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    key: PropTypes.string,
    name: PropTypes.string,
  })),
  query: PropTypes.object, // eslint-disable-line
  t: PropTypes.func.isRequired,
}

Filters.defaultProps = {
  disabled: false,
  options: [],
  query: {},
}

export default Filters
