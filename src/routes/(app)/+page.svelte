<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

    const n = BigInt(data.stats.spaceTaken!);
    const prod = n / 1000000000n
    const downloads = [
        'hello1',
        'hello2',
        'hello3',
    ]
    const news: string[] | null = [
        // 'A most unfortunate set of circumstances',
        // 'Server maintenance [completed]',
        // 'Redacted is back as redacted.sh',
        // 'Upload stat adjustment for users affected by the peer scraping / ghostleeching event',
        // 'Just nod if you can hear me'
    ]

    // const pollItems = [
    //     'Aeson Zevras - Hazlom',
    //     'In Death It Ends - Analog Witch',
    //     'The Range - Nonfiction',
    //     'Burd Brain - The BURNOUT SECTION',
    //     'Robbie Robertson - Contact From The Underworld Of Redboy',
    //     'Blank - Show the results!']

    const pollItems: string[] | null = []

    const motm: string[] | null = []
</script>
        <div id="content">
            <div id="major">
                <div id="latest_downloads">
                    {#each downloads as download}
                        <div>{download}</div>
                    {/each}
                </div>
            </div>
            <div id="minor">
                {#if motm.length != 0}
                <div class="minor_box" id="motm">
                    <div class="heading">
                        <a href="/">Media of the Month</a>
                    </div>
                        <div id="motm_img">
                            <img src="/Media/img/60c217-20120921-gorillaz-plastic-beach.jpg" alt="">
                        </div>
                </div>
                {/if}
                {#if news.length != 0} 
                <div class="minor_box" id="lbp">
                    <div class="heading">
                        <a href="/">Latest blog posts</a>
                    </div>
                    <div id="news">
                        <ul>
                            {#each news as newsSingular}
                            <li>
                                <a href="/">{newsSingular}</a>
                            </li>
                            {/each}
                        </ul>
                    </div>   
                </div>
                {/if}                 
                {#if pollItems.length != 0}
                <div class="minor_box" id="lp">
                    <div class="heading">
                        <a href="/">Latest Poll</a>
                    </div>
                    <div>
                        <ul>
                            {#each pollItems as item, i}
                            <li>
                                <input id="poll{i+1}" type="radio" name="poll">
                                <label for="poll{i+1}">{item}</label>
                            </li>
                            {/each}
                        </ul>
                    </div>
                </div>
                {/if}
                <div class="minor_box" id="stats">
                    <div class="heading">
                        <a href="/">Stats</a>
                    </div>
                    <ul>
                        <li>Maximum users {data.stats.maxUsers} </li>
                        <li>Enabled users: {data.stats.currentUsers}
                        <a href="/stats/users">[Details]</a>
                        </li>
                        <li>Users active today: {data.stats.thisDayUsers} </li>
                        <li>Users active this week: {data.stats.thisWeekUsers} </li>
                        <li>Users active this month: {data.stats.thisMonthUsers} </li>
                        <li>Torrents: {data.stats.qbitTorrents} </li>
                        <li>Movies: {data.stats.movies} </li>
                        <li>Series: {data.stats.series} </li>
                        <li>Artists: {data.stats.artists} </li>
                        <li>Albums: {data.stats.albums} </li>
                        <li>Authors: {data.stats.authors} </li>
                        <li>Books: {data.stats.books} </li>
                        <li>Requests: {data.stats.requests}({data.stats.requestsDone! / data.stats.requests!}% fulfilled) </li>
                        <li>Snatched: {data.stats.qbitSnatched} </li>
                        <li>Stalled: {data.stats.qbitStalled} </li>
                        <li>Seeding: {data.stats.qbitSeeding} </li>
                        <li>AVG. Seeded ratio: {data.stats.qbitAvgRatio} </li>
                        <li>Space Taken: {prod} GiB </li>
                    </ul>
                </div>
            </div>
        </div>