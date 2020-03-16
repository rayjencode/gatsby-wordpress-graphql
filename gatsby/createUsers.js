const path = require("path")
module.exports = async ({ actions, graphql }) => {
  // Setup our query
  const GET_USERS = `
        query GET_USERS($first:Int){
            wpgraphql{
                users(
                    first: $first
                ){
                    pageInfo{
                        endCursor
                        hasNextPage
                    }
                    nodes{
                        id
                        userId
                        slug
                    }
                }
            }
        }
    `

  const { createPage } = actions
  const allUsers = []

  // create a function for getting users
  const fetchUsers = async variables =>
    await graphql(GET_USERS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          users: {
            nodes,
            pageInfo: { hasNextPage },
          },
        },
      } = data

      nodes.map(user => {
        allUsers.push(user)
      })
      if (hasNextPage) {
        return fetchUsers({ first: variables.first, after: endUcursor })
      }
      return allUsers
    })

  // Map over all the users and call create page
  await fetchUsers({ first: 100, after: null }).then(allUsers => {
    const userTemplate = path.resolve(`./src/templates/user.js`)
    allUsers.map(user => {
      console.log(`create user: ${user.slug}`)
      createPage({
        path: `/user/${user.slug}`,
        component: userTemplate,
        context: user,
      })
    })
  })
}
