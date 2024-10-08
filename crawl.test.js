const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://www.time.ir/path";
  const actual = normalizeURL(input);
  const expected = "www.time.ir/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://www.time.ir/path/";
  const actual = normalizeURL(input);
  const expected = "www.time.ir/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://www.time.ir/path";
  const actual = normalizeURL(input);
  const expected = "www.time.ir/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://www.time.ir/path";
  const actual = normalizeURL(input);
  const expected = "www.time.ir/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.time.ir/">
                Time.ir
            </a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://www.time.ir";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.time.ir/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, relative", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/path/">
                  Time.ir
              </a>
          </body>
      </html>
    `;
  const inputBaseURL = "https://www.time.ir";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.time.ir/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, both", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="https://www.time.ir/path1/">
                Time.ir Path One
              </a>
              <a href="/path2/">
                  Time.ir Path Two
              </a>
          </body>
      </html>
    `;
  const inputBaseURL = "https://www.time.ir";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.time.ir/path1/", "https://www.time.ir/path2/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, invalid", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="invalid">
                  invalid URL
              </a>
          </body>
      </html>
    `;
  const inputBaseURL = "https://www.time.ir";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
