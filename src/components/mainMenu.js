import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { createLocalLink } from "../utils"

const MAIN_MENU_QUERY = graphql`
  fragment MenuFields on WPGraphql_MenuItem {
    id
    label
    url
  }
  query GET_MENU_ITEMS {
    wpgraphql {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          ...MenuFields
          childItems {
            nodes {
              ...MenuFields
            }
          }
        }
      }
    }
  }
`

const renderMenuItem = item => {
  let hasChild = false
  if (item.childItems && item.childItems.nodes.length) {
    hasChild = true
  }
  return (
    <li key={item.id} className="mainMenu__link mr-5">
      <Link
        to={createLocalLink(item.url)}
        className="mainMenu__item text-white text-decoration-none"
      >
        {item.label}
      </Link>
      {hasChild && renderChildMenu(item)}
    </li>
  )
}

const renderChildMenu = item => {
  return (
    <ul className="mainMenu__list__child list-unstyled ">
      {item.childItems.nodes.map(child => renderMenuItem(child))}
    </ul>
  )
}

const MainMenu = props => {
  return (
    <StaticQuery
      query={MAIN_MENU_QUERY}
      render={({
        wpgraphql: {
          menuItems: { nodes: menu },
        },
      }) => {
        return (
          <nav className="mainMenu mt-4">
            <ul className="mainMenu__list d-flex list-unstyled m-0">
              {menu.map(item => renderMenuItem(item))}
            </ul>
          </nav>
        )
      }}
    />
  )
}
export default MainMenu
