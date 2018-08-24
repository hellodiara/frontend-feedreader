/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests are within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // Test suite: RSS Feeds
    describe('RSS Feeds', () => {
        
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('url defined', () => {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

         it('name defined', () => {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });

    // Test suite: Menu
    describe('The Menu', () => {

         it('is hidden', () => {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);

         });

        it('toggles on and off', () => {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            //off test
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

         });

    });
       

    // Test suite: Initial Entries
    describe('Initial Entries', () => {

         beforeEach( (done) => {
            loadFeed(0, done)
         });

         it('completes work', () => {
            expect($('.feed .entry').length > 0).toBe(true);
         });
    });
    // Test suite: New Feed Selection
    describe('New Feed Selection', () => {
            const feed = document.querySelector('.feed');
            const firstFeed = [];

         beforeEach( (done) => {
            // Load first feed
            loadFeed(0);
            // Store the values of the first feed
            Array.from(feed.children).forEach( (entry) => {
                firstFeed.push(entry.innerText);
            });
            // Load second feed
            loadFeed(1, done);
         });

         it('content changes', () => {
            Array.from(feed.children).forEach( (entry, index) => {
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
         });  
    });

}());
