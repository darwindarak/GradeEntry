# GradeEntry

__GradeEntry__ provides a live-search interface to CSV files.
It allows data entry on only one column, and uses all the other
columns for searching.  It is meant to help with entering
grades for large classes.  In such a use case, the CSV file
may contain `First Name`, `Last Name`, and `Student ID` columns,
as well as a column to record the scores of an assignment.  The
user can quickly find the row corresponding to a student by
typing in parts of the the name, the ID, or even typing
in the student's initials.
 
## Usage

There are basically three steps to using this tools:

1. Load a class roster or grade book in CSV format on to the page
2. Find and enter student grades using the search interface 
3. Download a modified version of the original CSV file

Although this interface uses a browser, __no__ data is uploaded.
The entire CSV file and all the processing is done locally.
An internet connection is needed only for the initial loading
of the page (external JS, CSS, etcs.).  Downloading the libraries

- JQuery
- Twitter Bootstrap
- normalize.css

will allow __GradeEntry__ to run completely offline.

## Compatibility

__GradeEntry__ currently works best on Chrome and Firefox. Safari
has some trouble downloading the saved file and instead displays
the raw file in a new tab.  It is completely untested on IE.

## Credit

In addition to the heavy use of [JQuery](https://github.com/jquery/jquery) and
[React](https://github.com/facebook/react), __GradeEntry__ is made possible
with
- [generatedate](https://github.com/benkeen/generatedata) for the sample data
- [Papa Parse](https://github.com/mholt/jquery.parse) for CSV parsing
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) for file saving
- [Twitter Bootstrap](https://github.com/twbs/bootstrap) and [normalize.css]
  (https://github.com/necolas/normalize.css/) for theming
- [github-fork-ribbon-css](https://github.com/simonwhitaker/github-fork-ribbon-css)
  for the CSS GitHub fork ribbons.
