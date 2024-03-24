import { ElementStyles } from "../../src/types/element-styles";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { createInitialItemsListForTesting } from "../utils/utils";

const initialArray = ['1', '2', '3'];

describe ('data structure stack works correctly', () => {
    beforeEach(() => {
        cy.visit('/queue');
    });

    it("the add button should be disabled then the input is empty", () => {
        cy.get('input').should('be.empty');
        cy.get('[data-test-id="add"]').should('be.disabled');
    });

    it('should add the new element correctly', () => {
        cy.clock();

        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-test-id="add"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').as('circles');
        cy.get('@circles').first().as('firstElement');

        cy.get('@firstElement')
        .should('contain', '1')
        .and('have.css', 'border', ElementStyles.Changing)
        .siblings().should('contain', 'head').and('contain', 'tail');
    
        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@firstElement').should('have.css', 'border', ElementStyles.Default);
    
        cy.get('input').type('2');
        cy.get('[data-test-id="add"]').click();
    
        cy.get('@circles').should('have.length', 7).each((item, index) => {
            if (index === 0) {
                cy.wrap(item).contains('1');
                cy.wrap(item).siblings().contains('head');
            }
            if (index === 1) {
                cy.wrap(item).contains('2');
                cy.wrap(item).siblings().contains('tail');
            }
        });
    });

    it ('elements are deleted correctly', () => {
        cy.clock();
        createInitialItemsListForTesting(initialArray);

        cy.get('[data-test-id="circle"]').as('circles');

        cy.get('@circles').eq(0)
        .should('contain', '1')
        .siblings().should('contain', 'head');

        cy.get('[data-test-id="delete"]').should('not.be.disabled').click();

        cy.get('@circles').eq(0).should('have.css', 'border', ElementStyles.Changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').eq(0).should('contain', '').and('not.contain', 'head').and('have.css', 'border', ElementStyles.Default);
        cy.get('@circles').eq(1).siblings().should('contain', 'head');

        cy.get('[data-test-id="delete"]').should('not.be.disabled').click();

        cy.get('@circles').eq(1).should('have.css', 'border', ElementStyles.Changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').eq(1).should('contain', '').and('not.contain', 'head').and('have.css', 'border', ElementStyles.Default);
        cy.get('@circles').eq(2).siblings().should('contain', 'head').and('contain', 'tail');
    
    });

    it ('queue clearing works correctly', () => {
        cy.clock();
        createInitialItemsListForTesting(initialArray);

        cy.get('[data-test-id="circle"]').as('circles');

        cy.get('@circles').should('have.length', 7).each((item, index) => {
            if (index === 0) {
                cy.wrap(item).contains('1');
                cy.wrap(item).siblings().contains('head');
            }
            if (index === 1) {
                cy.wrap(item).contains('2');
            }
            if (index === 2) {
                cy.wrap(item).contains('3');
                cy.wrap(item).siblings().contains('tail');
            }
        });

        cy.get('[data-test-id="reset"]').should('not.be.disabled').click();

        cy.get('@circles').each((item) => {
            cy.wrap(item).should('contain', '');
        });
    })
});