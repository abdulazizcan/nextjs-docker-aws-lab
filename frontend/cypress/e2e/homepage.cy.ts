describe("Homepage User Flow", () => {
  it("should load the page, click the button, and display the message from the API", () => {
    cy.visit("http://localhost:3000");

    cy.contains("h1", "Lab-Project v1").should("be.visible");

    cy.get("button").contains("Fetch the data").click();

    cy.contains("Merhaba! Bu mesaj API üzerinden geldi.").should("be.visible");
  });
});
