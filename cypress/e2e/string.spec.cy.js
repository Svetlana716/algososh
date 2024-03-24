import { ElementStyles } from "../../src/types/element-styles";

describe ('reverse string algorithm works correctly', () => {
    beforeEach(() => {
        cy.visit('/recursion');
    });

    it ('the button should be disabled then the input is empty', () => {
        cy.get('input').should('be.empty');
        cy.get('button').should('be.disabled');
    });

    it ('should reverse word by steps correctly and css styles is right', () => {
        const input = '12345';
        const output = ['52341', '54321'];
        
        cy.clock();
        cy.get('input').type(input).should('have.value', input);
        cy.get('button[type=submit]').should('not.be.disabled').click();
        
        cy.get('[data-test-id="circle"]').as('circles');
        
        cy.get('@circles')
        .should('have.length', 5)
        .each((item, index) => {
            cy.wrap(item).should('contain', input[index]).and('have.css', 'border', ElementStyles.Default);
        });

        cy.tick(1000);

        cy.get('@circles')
        .each((item, index) => {
            const style = index === 0 || index === input.length - 1 ? ElementStyles.Changing : ElementStyles.Default;
            cy.wrap(item).should('contain', input[index]).and('have.css', 'border', style);
        });

        cy.tick(1000);

        cy.get('@circles')
        .each((item, index) => {
            const style = index === 0 || index === input.length - 1 ? ElementStyles.Modified : index === 1 || index === input.length - 2 ? ElementStyles.Changing : ElementStyles.Default;
            cy.wrap(item).should('contain', output[0][index]).and('have.css', 'border', style);
        });

        cy.tick(1000);

        cy.get('@circles')
        .each((item, index) => {
            cy.wrap(item).should('contain', output[1][index]).and('have.css', 'border', '4px solid rgb(127, 224, 81)');
        });
    });

})