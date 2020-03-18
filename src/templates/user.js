import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/archivePosts"
import SEO from "../components/seo"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props

  const { name, avatar, description, posts } = user

  return (
    <Layout>
      <SEO title={`User: ${name}`} />
      <div className="d-flex align-items-center">
        <img className="mr-3" src={avatar.url} alt={name} />
        <h1>{name}</h1>
      </div>
      <p>Description: {description}</p>
      <ArchivePosts posts={posts} />
    </Layout>
  )
}

export default UserTemplate

export const pageQuery = graphql`
  query GET_USER($id: ID!) {
    wpgraphql {
      user(id: $id) {
        id
        name
        slug
        description
        avatar {
          url
          size
        }
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
          }
        }
      }
    }
  }
`
