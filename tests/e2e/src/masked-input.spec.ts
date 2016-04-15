/// <reference path="../../jasmine/jasmine.d.ts" />

function getCursor(inputElement) {
    return browser.executeScript("return arguments[0].selectionStart;", inputElement.getWebElement());
}

function setCursor(inputElement, index) {
    inputElement.setSelectionRange(index, index);
}

describe("masked input", () => {
    beforeEach( () => {
        browser.loadAndWaitForAureliaPage("http://127.0.0.1:8080/");
    });

    it("should behave with arrow keys", () => {
        let input1 = element(by.id("input1"));
        let result = null;
        input1.sendKeys("1");
        expect(input1.getAttribute("value")).toBe("(1__) (___) _____");
        expect(getCursor(input1)).toBe(2);

        input1.sendKeys("2");
        expect(input1.getAttribute("value")).toBe("(12_) (___) _____");
        expect(getCursor(input1)).toBe(3);

        input1.sendKeys(protractor.Key.ARROW_LEFT);
        input1.sendKeys("3");
        expect(input1.getAttribute("value")).toBe("(132) (___) _____");
        expect(getCursor(input1)).toBe(3);

        input1.sendKeys(protractor.Key.ARROW_RIGHT);
        input1.sendKeys("4");
        expect(input1.getAttribute("value")).toBe("(132) (4__) _____");
        expect(getCursor(input1)).toBe(8);

        input1.sendKeys(protractor.Key.ARROW_RIGHT);
        input1.sendKeys("5");
        expect(input1.getAttribute("value")).toBe("(132) (45_) _____");
        expect(getCursor(input1)).toBe(9);

        input1.sendKeys(protractor.Key.ARROW_UP);
        input1.sendKeys("6");
        expect(input1.getAttribute("value")).toBe("(613) (245) _____");
        expect(getCursor(input1)).toBe(2);

        input1.sendKeys(protractor.Key.ARROW_DOWN);
        input1.sendKeys("7");
        expect(input1.getAttribute("value")).toBe("(613) (245) 7____");
        expect(getCursor(input1)).toBe(13);
    });

    it("should behave with delete", () => {
        let input1 = element(by.id("input1"));
        let result = null;
        input1.click(); // be focused!
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys(protractor.Key.DELETE);
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys("12345678901");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys(protractor.Key.DELETE);
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys(protractor.Key.ARROW_UP);
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys(protractor.Key.DELETE);
        expect(input1.getAttribute("value")).toBe("(234) (567) 8901_");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys(protractor.Key.ARROW_RIGHT);
        input1.sendKeys(protractor.Key.ARROW_RIGHT);
        expect(input1.getAttribute("value")).toBe("(234) (567) 8901_");
        expect(getCursor(input1)).toBe(3);

        input1.sendKeys(protractor.Key.DELETE);
        expect(input1.getAttribute("value")).toBe("(235) (678) 901__");
        expect(getCursor(input1)).toBe(3);

        input1.sendKeys(protractor.Key.ARROW_RIGHT);
        expect(input1.getAttribute("value")).toBe("(235) (678) 901__");
        expect(getCursor(input1)).toBe(7);

        input1.sendKeys(protractor.Key.DELETE);
        expect(input1.getAttribute("value")).toBe("(235) (789) 01___");
        expect(getCursor(input1)).toBe(7);
    });

    it("should behave with backspace", () => {
        let input1 = element(by.id("input1"));
        let result = null;
        input1.click(); // be focused!
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys("12345678901");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (456) 7890_");
        expect(getCursor(input1)).toBe(16);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (456) 789__");
        expect(getCursor(input1)).toBe(15);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (456) 78___");
        expect(getCursor(input1)).toBe(14);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (456) 7____");
        expect(getCursor(input1)).toBe(13);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (456) _____");
        expect(getCursor(input1)).toBe(10);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (45_) _____");
        expect(getCursor(input1)).toBe(9);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (4__) _____");
        expect(getCursor(input1)).toBe(8);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(123) (___) _____");
        expect(getCursor(input1)).toBe(4);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(12_) (___) _____");
        expect(getCursor(input1)).toBe(3);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(1__) (___) _____");
        expect(getCursor(input1)).toBe(2);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys(protractor.Key.BACK_SPACE);
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);
    });
    
    it("should not accept alpha chars (unless it should)", () => {
        let input1 = element(by.id("input1"));
        let result = null;
        input1.click(); // be focused!
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys("12345678901");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys("2");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys("*");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys("\n");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys(protractor.Key.ARROW_LEFT);
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(16);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys(protractor.Key.ARROW_UP);
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(2);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(3);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(7);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(8);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(9);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(12);

        // this position is a wildcard mask - x should be allowed
        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) x7890");
        expect(getCursor(input1)).toBe(13);
        
        // this position is a wildcard mask - x should be allowed
        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) xx789");
        expect(getCursor(input1)).toBe(14);
        
        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) xx789");
        expect(getCursor(input1)).toBe(15);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) xx789");
        expect(getCursor(input1)).toBe(16);

        input1.sendKeys("x");
        expect(input1.getAttribute("value")).toBe("(123) (456) xx789");
        expect(getCursor(input1)).toBe(17);
    });

    it("should accept numeric chars", () => {
        let input1 = element(by.id("input1"));
        let result = null;
        input1.click(); // be focused!
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys("12345678901");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys(protractor.Key.ARROW_UP);
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(012) (345) 67890");
        expect(getCursor(input1)).toBe(2);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(001) (234) 56789");
        expect(getCursor(input1)).toBe(3);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (123) 45678");
        expect(getCursor(input1)).toBe(7);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (012) 34567");
        expect(getCursor(input1)).toBe(8);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (001) 23456");
        expect(getCursor(input1)).toBe(9);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (000) 12345");
        expect(getCursor(input1)).toBe(12);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (000) 01234");
        expect(getCursor(input1)).toBe(13);
        
        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (000) 00123");
        expect(getCursor(input1)).toBe(14);
        
        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (000) 00012");
        expect(getCursor(input1)).toBe(15);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (000) 00001");
        expect(getCursor(input1)).toBe(16);

        input1.sendKeys("0");
        expect(input1.getAttribute("value")).toBe("(000) (000) 00000");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys("9");
        expect(input1.getAttribute("value")).toBe("(000) (000) 00000");
        expect(getCursor(input1)).toBe(17);
    });

    it("should replace selected characters", () => {
        let input1 = element(by.id("input1"));
        let result = null;
        input1.click(); // be focused!
        expect(input1.getAttribute("value")).toBe("(___) (___) _____");
        expect(getCursor(input1)).toBe(1);

        input1.sendKeys("12345678901");
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(17);

        input1.sendKeys(protractor.Key.ARROW_LEFT);
        input1.sendKeys(protractor.Key.ARROW_LEFT);
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(15);

        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        expect(input1.getAttribute("value")).toBe("(123) (456) 78901");
        expect(getCursor(input1)).toBe(13);


        input1.sendKeys("2");
        expect(input1.getAttribute("value")).toBe("(123) (456) 7201_");
        expect(getCursor(input1)).toBe(14);

        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));

        input1.sendKeys("3");
        expect(input1.getAttribute("value")).toBe("(123) (456) 301__");
        expect(getCursor(input1)).toBe(12);

        input1.sendKeys(protractor.Key.ARROW_DOWN);
        input1.sendKeys(protractor.Key.ARROW_LEFT);
        expect(input1.getAttribute("value")).toBe("(123) (456) 301__");
        expect(getCursor(input1)).toBe(14);

        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        input1.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ARROW_LEFT));
        expect(input1.getAttribute("value")).toBe("(123) (456) 301__");
        expect(getCursor(input1)).toBe(9);

        input1.sendKeys("7");
        expect(input1.getAttribute("value")).toBe("(123) (457) 1____");
        expect(getCursor(input1)).toBe(12);
    });

    it("should be bound to model", () => {
        let input1 = element(by.id("input1"));
        let update1 = element(by.id("update1"));

        update1.click();
        expect(input1.getAttribute("value")).toBe("(123) (456) AB789");
    });

/**
 * Test cases still to do:
 * 
 * format (999) 999-9999, current value: 3334445555, caret at end: (333) 444-5555|
 * click for caret like this: (333) 444-|5555
 * should immediately move caret like this: (333) 444|-5555
 */
});