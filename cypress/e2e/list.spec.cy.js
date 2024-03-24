import { ElementStyles } from "../../src/types/element-styles";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const value = '123'; // значение, вводимое в первый инпут
const index = '2'; // номер индекса, который вводим во второй инпут для добавления/удаления элементов по индексу

describe('data structure linked list works correctly', () => {
    beforeEach(() => {
        cy.visit('/list');
    });

    it("the add buttons and delete by index button should be disabled then the input is empty", () => {
        cy.get('input').should('be.empty');
        cy.get('[data-test-id="addInHeadBtn"]').should('be.disabled');
        cy.get('[data-test-id="addInTailBtn"]').should('be.disabled');
        cy.get('[data-test-id="addByIndexBtn"]').should('be.disabled');
        cy.get('[data-test-id="deleteByIndexBtn"]').should('be.disabled');
    });

    it('the default list is rendered correctly', () => {
        cy.get('[data-test-id="circle"]').as('circles');

        cy.get('@circles').should('have.length', 4).each((item, index) => {
            cy.wrap(item)
                .should('not.be.empty')
                .and('have.css', 'border', ElementStyles.Default)
                .siblings().should('contain', index);
        });

        cy.get('@circles').first().siblings().contains('head');
        cy.get('@circles').last().siblings().contains('tail');
    });

    it('should add the new element in head correctly', () => {
        cy.clock();

        cy.get('[data-test-id="inputForValue"]').type(value).should('have.value', value);
        cy.get('[data-test-id="addInHeadBtn"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').not('[class*=circle_small]').as('circles'); // основные круги
        cy.get('[class*=circle_small]').as('extraCircle'); // маленькие дополнительные круги
        cy.get('@circles').first().as('firstCircle'); // первый основной круг

        cy.get('@circles').should('have.length', 4);

        cy.get('@firstCircle') // проверяем что у первого основного круга вместо 'head' маленький дополнительный круг
            .siblings('[class*=circle_index]').contains('0') // индекс первого элемента равен 0
            .siblings('[class*=circle_head]').contains(value); // содержит значение из инпута


        cy.get('@extraCircle') // проверяем маленький доп. круг 
            .should('contain', value)
            .and('have.css', 'border', ElementStyles.Changing)
            .and('have.css', 'width', '56px');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 5);

        cy.get('@firstCircle') // после вставки элемента 
            .should('contain', value)
            .and('have.css', 'border', ElementStyles.Modified)
            .and('have.css', 'width', '80px')
            .siblings('[class*=circle_index]').contains('0')
            .siblings('[class*=circle_head]').contains('head');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@firstCircle').should('have.css', 'border', ElementStyles.Default);
    });

    it('should add the new element in tail correctly', () => {
        cy.clock();

        cy.get('[data-test-id="inputForValue"]').type(value).should('have.value', value);
        cy.get('[data-test-id="addInTailBtn"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').not('[class*=circle_small]').as('circles'); // основные круги
        cy.get('[class*=circle_small]').as('extraCircle'); // маленькие дополнительные круги
        cy.get('@circles').last().as('lastCircle'); // поледний основной круг

        cy.get('@circles').should('have.length', 4);

        cy.get('@lastCircle') // проверяем что у последнего основного круга на место 'head' разместился маленький дополнительный круг
            .siblings('[data-test-id="tail"]').contains('tail') // 'tail' на месте
            .siblings('[class*=circle_index]').contains('3') // индекс последнего элемента 
            .siblings('[class*=circle_head]').contains(value); // содержит значение из инпута

        cy.get('@extraCircle') // проверяем маленький доп. круг 
            .should('contain', value)
            .and('have.css', 'border', ElementStyles.Changing)
            .and('have.css', 'width', '56px');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 5);

        cy.get('@lastCircle') // после вставки элемента 
            .should('contain', value)
            .and('have.css', 'border', ElementStyles.Modified)
            .and('have.css', 'width', '80px')
            .siblings('[class*=circle_index]').contains('4')
            .siblings('[data-test-id="tail"]').contains('tail');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@lastCircle').should('have.css', 'border', ElementStyles.Default);
    });

    it('should delete the element from head correctly', () => {
        cy.clock();

        cy.get('[data-test-id="deleteFromHeadBtn"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').not('[class*=circle_small]').as('circles'); // основные круги
        cy.get('[class*=circle_small]').as('extraCircle'); // маленький дополнительный круг
        cy.get('@circles').first().as('firstCircle'); // первый основной круг

        cy.get('@circles').should('have.length', 4);

        cy.get('@firstCircle') // проверяем что у первого основного круга вместо 'tail' маленький дополнительный круг со значением большого, а в большом пусто
            .should('contain', '')
            .siblings('[class*=circle_index]').contains('0') // индекс первого элемента равен 0
            .siblings('[data-test-id="tail"]').should('not.be.empty'); // содержит значение из инпута


        cy.get('@extraCircle') // проверяем маленький доп. круг 
            .should('not.be.empty')
            .and('have.css', 'border', ElementStyles.Changing)
            .and('have.css', 'width', '56px');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 3).each((item, index) => {
            cy.wrap(item)
                .should('not.be.empty')
                .and('have.css', 'border', ElementStyles.Default)
                .siblings().should('contain', index);
        });
    });

    it('should delete the element from tail correctly', () => {
        cy.clock();

        cy.get('[data-test-id="deleteFromTailBtn"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').not('[class*=circle_small]').as('circles'); // основные круги
        cy.get('[class*=circle_small]').as('extraCircle'); // маленький дополнительный круг
        cy.get('@circles').last().as('lastCircle'); // первый основной круг

        cy.get('@circles').should('have.length', 4);

        cy.get('@lastCircle') // проверяем что у последнего основного круга вместо 'tail' маленький дополнительный круг со значением большого, а в большом пусто
            .should('contain', '')
            .siblings('[class*=circle_index]').contains('3') // индекс последнего элемента равен 0
            .siblings('[data-test-id="tail"]').should('not.be.empty'); // содержит значение из инпута


        cy.get('@extraCircle') // проверяем маленький доп. круг 
            .should('not.be.empty')
            .and('have.css', 'border', ElementStyles.Changing)
            .and('have.css', 'width', '56px');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 3).each((item, index) => {
            cy.wrap(item)
                .should('not.be.empty')
                .and('have.css', 'border', ElementStyles.Default)
                .siblings().should('contain', index);
        });
    });

    it('should add the new element by index correctly', () => {
        cy.clock();

        cy.get('[data-test-id="inputForValue"]').type(value).should('have.value', value);
        cy.get('[data-test-id="inputForIndex"]').type(index).should('have.value', index);
        cy.get('[data-test-id="addByIndexBtn"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').not('[class*=circle_small]').as('circles'); // основные круги
        cy.get('[class*=circle_small]').as('extraCircle'); // маленький доп. круг

        cy.get('@circles').should('have.length', 4);

        cy.get('@extraCircle') // проверяем маленький доп. круг 
            .should('contain', value)
            .and('have.css', 'border', ElementStyles.Changing)
            .and('have.css', 'width', '56px');

        for (let i = 0; i <= index; i++) { // в цикле проверяем изменение кругов
            cy.get('@circles').eq(i)
                .siblings('[class*=circle_index]').contains(i)
                .siblings('[class*=circle_head]').contains(value);


            cy.tick(SHORT_DELAY_IN_MS);

            if (i < index) {
                cy.get('@circles').eq(i).should('have.css', 'border', ElementStyles.Changing)
            }
        };

        cy.get('@circles').should('have.length', 5);

        cy.get('@circles').eq(index) // после вставки элемента 
            .should('contain', value)
            .and('have.css', 'border', ElementStyles.Modified)
            .and('have.css', 'width', '80px')
            .siblings('[class*=circle_index]').contains(index);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').eq(index).should('have.css', 'border', ElementStyles.Default);

    });

    it('should delete the element by index correctly', () => {
        cy.clock();

        cy.get('[data-test-id="inputForIndex"]').type(index).should('have.value', index);
        cy.get('[data-test-id="deleteByIndexBtn"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').not('[class*=circle_small]').as('circles'); // основные круги

        cy.get('@circles').should('have.length', 4);

        for (let i = 0; i < index; i++) { // в цикле проходим по всем элементам, пока не дойдем до нужного индекса
            cy.get('@circles').eq(i)
                .should('have.css', 'border', ElementStyles.Changing)
                .siblings('[class*=circle_index]').contains(i)

            cy.tick(SHORT_DELAY_IN_MS);

            if (i === index) {
                cy.get('[class*=circle_small]').as('extraCircle'); // маленький доп. круг

                cy.get('@extraCircle') // проверяем маленький доп. круг 
                    .should('not.be.empty')
                    .and('have.css', 'border', ElementStyles.Changing)
                    .and('have.css', 'width', '56px');

                cy.get('@circles').eq(i)
                    .should('contain', '')
                    .and('have.css', 'border', ElementStyles.Changing)
                    .siblings('[class*=circle_index]').contains(i)
                    .siblings('[data-test-id="tail"]').should('not.be.empty');
            };
            cy.tick(SHORT_DELAY_IN_MS);
        };

        cy.get('@circles').should('have.length', 3).each((item, index) => {
            cy.wrap(item)
                .should('not.be.empty')
                .and('have.css', 'border', ElementStyles.Default)
                .siblings().should('contain', index);
        });
    });
})