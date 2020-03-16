import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props

  const { title, content, author, categories, tags } = post
  return (
    <Layout>
      <h1>{title}</h1>
      <ul className="metaData list-unstyled">
        <li>
          Author: <Link to={`/user/${author.slug}`}>{author.name}</Link>
        </li>
        <li className="d-flex align-items-center">
          <div>Category:</div>
          <ul className="list-unstyled d-flex">
            {categories.nodes.map(cat => (
              <li>
                <Link to={`/blog/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="d-flex align-items-center">
          <div>Tag:</div>
          <ul className="d-flex list-unstyled">
            {tags.nodes.map(tag => (
              <li>
                <Link to={`blog/tag/${tag.slug}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
        uri
        author {
          name
          slug
        }
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`
