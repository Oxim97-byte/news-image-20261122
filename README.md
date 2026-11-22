# The World in One Day — 22 November 2026

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/Oxim97-byte/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/Oxim97-byte/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)

## What the front page carries

One dashboard for Sunday 22 November 2026 — 34 stories, 7 regions, 10 fields. The lead story is the war spreading to NATO: Secretary General Mark Rutte in Warsaw promising "we will defend every inch of Poland", after 515 weapons were fired at Ukraine on 20 November and two missiles and a drone fell in Poland, while the Russian freighter Sparta II burns in the Gulf of Finland. A stats strip up top carries the day's hard numbers (Nasdaq −5.28%, S&P −3.7%, 515 weapons fired, VIX 35.89, $4tn wiped in a week). Below the lead, six photo cards cover the AI stock crash, Iran's claim of hitting two US Patriot radars in Bahrain, the COP31 talks ending with no deal, the International Court of Justice ruling 9–6 that Myanmar committed genocide, the capture of El Chapo Isidro in Mexico, and the breach of the FBI's national crime database. A dotted world map marks where the day happened, and an ALSO ON strip lists 27 more stories — so a reader can take in the whole day at a glance.

## Getting the picture out

`main.ts` is a small Node 22 program, standard library only, that carries the finished newspaper image (`entry.png`, next to it) into the output folder. Before copying it checks the file is a genuine PNG or JPEG, no bigger than 1 MiB and no side longer than 1024 pixels, reading the size from the header without decoding any pixels; after copying it reads the copy back and refuses to finish unless every byte matches the original.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Without `MAKEFUN_OUTPUT_DIR` it writes to `/output` instead. On success it prints one line with the output path, the image format and dimensions, and the byte count.
