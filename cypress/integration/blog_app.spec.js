describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'User Numberone',
        username: 'userNumberone',
        password: 'usernumberonepass'
      }
      const user2 = {
        name: 'User Numbertwo',
        username: 'userNumbertwo',
        password: 'usernumbertwopass'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login').click()
      cy.contains('Blogs')
    })
  
    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.contains('Login').click()
        cy.get('#username').type('userNumberone')
        cy.get('#password').type('usernumberonepass')
        cy.get('#login-button').click()
  
        cy.contains('User Numberone logged-in')
      })
  
      it('fails with wrong credentials', function() {
        cy.contains('Login').click()
        cy.get('#username').type('userNumberone')
        cy.get('#password').type('notusernumberonepass')
        cy.get('#login-button').click()
  
        cy.get('.error')
          .should('contain', 'wrong credentials')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
      })
    })
  
    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'userNumberone', password: 'usernumberonepass' })
      })
  
      it('a new blog can be created', function() {
        cy.contains('New Blog').click()
        cy.get('#blog-title').type('Blog created by cypress')
        cy.get('#blog-author').type('userCypress')
        cy.get('#blog-url').type('http://examplecypress.com')
        cy.contains('Create').click()
  
        cy.contains('View').click()
        cy.contains('Blog created by cypress')
        cy.contains('userCypress')
        cy.contains('http://examplecypress.com')
      })
  
      describe('a blog exists', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'newBlogCypress', author: 'authorRandom', url: 'http://newblog.com'
          })
        })
  
        it('user can like a blog', function() {
          cy.contains('newBlogCypress')
            .contains('View').click()
          cy.contains('Like').click()
  
          cy.contains('Likes')
            .contains('1')
        })
  
        it('if the user is the owner of the blog, he can delete it', function() {
          cy.contains('newBlogCypress')
            .contains('View').click()
  
          cy.contains('Remove').click()
        })
  
        it('if the user is not the owner of the blog, he can not delete the blog', function() {
          cy.contains('Logout').click()
          cy.login({ username: 'randomAuthor', password: 'iamrandom' })
          cy.contains('newBlogCypress')
            .contains('View').click()
  
          cy.contains('Remove').should('not.exist')
        })
      })
  
      describe('several blogs exists', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'first blog', author: 'firstAuthor', url: 'http://firstblog.com'
          })
          cy.createBlog({
            title: 'second blog', author: 'secondAuthor', url: 'http://secondblog.com'
          })
          cy.createBlog({
            title: 'third blog', author: 'thirdAuthor', url: 'http://thirdblog.com'
          })

          cy.likeBlog('first blog', 2)
          cy.likeBlog('second blog', 1)
          cy.likeBlog('third blog', 3)
        })
  
        it('Blogs are ordered by  the amount of likes in descending order', function() {
          cy.visit('http://localhost:3000')
          cy.get('.blog')
            .then($blog => {
              cy.wrap($blog[0]).should('contain', 'third blog')
              cy.wrap($blog[1]).should('contain', 'first blog')
              cy.wrap($blog[2]).should('contain', 'second blog')
            })
        })
      })
    })
  })