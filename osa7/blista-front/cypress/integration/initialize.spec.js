describe('Blog application', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/reset');
    const user = { username: 'teppo', password: 'testaaja', name: 'teetee' };
    cy.request('POST', 'http://localhost:3000/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('frontpage and login works', function() {
    cy.contains('Login to application');
    cy.get('#username').type('teppo');
    cy.get('#password').type('testaaja');
    cy.get('.is-primary').click();
    cy.contains('List of blogs');
  });

  it('can create new blog', function() {
    cy.get('#username').type('teppo');
    cy.get('#password').type('testaaja');
    cy.get('.is-primary').click();
    cy.contains('Create blog').click();
    cy.get('#title').type('Title of blog');
    cy.get('#author').type('Author');
    cy.get('#url').type('http://www.google.fi');
    cy.contains('Create new blog').click();

    // Should contains the created message
    cy.contains('New blog \'Title');
    cy.get('span > a').click();

    // Like should work
    cy.contains('0 likes');
    cy.contains('Like').click();
    cy.contains('1 likes');
  });

  it('can open and use navigation menu', function() {
    cy.get('#username').type('teppo');
    cy.get('#password').type('testaaja');
    cy.get('.is-primary').click();

    // Navbar should open
    cy.get('.navbar-burger').click();
    cy.contains('teetee logged in.');

    // Should navigate to userlist page
    cy.contains('Users').click();
    cy.contains('List of users');

    // Should hide navbar
    cy.get('.navbar-burger').click();
    cy.get('tr > :nth-child(1) > a').click();
    cy.contains('Added blogs');
  });

});
