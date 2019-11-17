# Followshows Scraper

Opens `www.followshows.com` in a headless puppeteer browser and scrapes your 'Next Episodes' into a markdown file showing

> Note: In order to authenticate initially, you have to change `headless: true` to false and hijack the browser session

## Running

```
$ npm start

> followshows-scraper@1.0.0 start C:\dev\github\followshows-scraper
> node src/main.js

[ ] Scraping Videos
[ ]      Opening Browser
[ ]      Navigating to https://followshows.com/
[ ]      Clicking .videos-grid-show-more
[ ]      Scraping .video-wrapper ....................................
[ ]      Closing Browser
[ ] Parsing Video Information
[ ]      Parsing 36 videos ....................................
[ ] Creating Markdown
[ ]      "Ongoing Season" Table .........
[ ]      "New Season" Table ....................
[ ]      "New Series" Table .......
[ ] Writing to file followshows-2019-11-17 1-28.md
[ ] Complete
```

## Example Output

```markdown
# Ongoing Season

|             Show Name             | Num Episodes | Watch Time | Next Episode |     Next Episode Name     |
| :-------------------------------: | :----------: | :--------: | :----------: | :-----------------------: |
| It's Always Sunny in Philadelphia |      1       |  25 mins   |    s14e8     |   Paddy's Has a Jumper    |
|            South Park             |      1       |  25 mins   |    s23e7     |            TBA            |
|            HarmonQuest            |      2       |  50 mins   |     s3e9     |   The Starshade Expanse   |
|          The Good Place           |      4       |  100 mins  |     s4e5     |  Employee of the Bearimy  |
|               Arrow               |      6       |  4 hours   |    s7e21     |       Living Proof        |
|       House of Cards (2012)       |      7       |  6 hours   |     s6e2     |        Chapter 67         |
|           Titans (2018)           |      10      |  8 hours   |     s2e2     |           Rose            |
|             Mr. Robot             |      19      |  14 hours  |    s2e10     | eps2.8_h1dden-pr0cess.axx |
|               Suits               |      23      |  17 hours  |     s8e4     |  Revenue Per Square Foot  |

# New Season

|        Show Name        | Num Episodes | Watch Time | Next Episode |                     Next Episode Name                     |
| :---------------------: | :----------: | :--------: | :----------: | :-------------------------------------------------------: |
|     Silicon Valley      |      3       |  90 mins   |     s6e1     |              Artificial Lack of Intelligence              |
|     Black Lightning     |      5       |  3 hours   |     s3e1     | The Book of Occupation: Chapter One: Birth of a Blackbird |
|    The Flash (2014)     |      5       |  3 hours   |     s6e1     |                       Into the Void                       |
|        Red Dwarf        |      6       |  180 mins  |    s12e1     |                           Cured                           |
|         Legion          |      8       |  6 hours   |     s3e1     |                        Chapter 20                         |
|         Humans          |      8       |  6 hours   |     s3e1     |                         Episode 1                         |
|   Designated Survivor   |      10      |  7 hours   |     s3e1     |                    #thesystemisbroken                     |
|   Marvel's Iron Fist    |      10      |  9 hours   |     s2e1     |                   The Fury of Iron Fist                   |
|        Westworld        |      10      |  10 hours  |     s2e1     |                    Journey Into Night                     |
|    Ash vs Evil Dead     |      10      |  5 hours   |     s3e1     |                          Family                           |
| Orange is the New Black |      13      |  13 hours  |     s7e1     |                   Beginning of the End                    |
|      Jessica Jones      |      13      |  11 hours  |     s3e1     |                 A.K.A The Perfect Burger                  |
|   The Handmaid's Tale   |      13      |  11 hours  |     s3e1     |                           Night                           |
|       Elementary        |      13      |  9 hours   |     s7e1     |                  The Further Adventures                   |
|        Daredevil        |      13      |  11 hours  |     s3e1     |                       Resurrection                        |
|   Marvel's Luke Cage    |      13      |  11 hours  |     s2e1     |                      Soul Brother #1                      |
|         Archer          |      17      |  7 hours   |     s9e1     |               Danger Island: Strange Pilot                |
|    Dear White People    |      20      |  10 hours  |     s2e1     |                         Chapter I                         |
|         Gotham          |      34      |  25 hours  |     s4e1     |                A Dark Knight: Pax Penguina                |
|     Attack on Titan     |      34      |  14 hours  |     s2e1     |                        Beast Titan                        |

# New Series

|       Show Name        | Num Episodes | Watch Time | Next Episode |                  Next Episode Name                  |
| :--------------------: | :----------: | :--------: | :----------: | :-------------------------------------------------: |
|    The Mandalorian     |      2       |  80 mins   |     s1e1     |                      Chapter 1                      |
|   His Dark Materials   |      2       |  120 mins  |     s1e1     |                    Lyra's Jordan                    |
|    For All Mankind     |      5       |  5 hours   |     s1e1     |                      Red Moon                       |
|          See           |      5       |  5 hours   |     s1e1     |                      Godflame                       |
|       Treadstone       |      5       |  3 hours   |     s1e1     |                 The Cicada Protocol                 |
| Tom Clancy's Jack Ryan |      16      |  16 hours  |     s1e1     |                        Pilot                        |
|     American Greed     |     176      | 132 hours  |     s1e1     | Hook, Line and Sucker and Maxfield Parish Art Heist |

```