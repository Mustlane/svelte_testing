<script lang="ts">
    let { children, data } = $props();
    import menu from '$lib/images/menu.svg';
    import logo from '$lib/images/M_letter_v01.svg'
	  import type { LayoutServerData } from './$types';
    import type { LayoutData } from '../$types';
    import { onMount } from 'svelte';
  
    let info = {
        up: 100,
        down: 100,
        ratio: 1
    }

  let isDropdownOpen = $state(false)

  const handleDropdownHover = () => {
    isDropdownOpen = !isDropdownOpen
    console.log(isDropdownOpen)
  }

onMount(() => {
  const firstFather = document.getElementById('first_father');
  const secondFather = document.getElementById('second_father');
  const firstDropdown = document.getElementById('first_dropdown');
  const secondDropdown = document.getElementById('second_dropdown');

  if (firstFather && secondFather && firstDropdown && secondDropdown) {
    const getValue = (child: HTMLElement) => getComputedStyle(child).getPropertyValue('background-color');

    const changeColors = () => {
      firstDropdown.style.backgroundColor = getValue(firstFather);
      secondDropdown.style.backgroundColor = getValue(secondFather);
    };

    changeColors();
    console.log('Hello, world');
  } else {
    console.warn("Some elements not found in the DOM.");
  }
});

</script>

{#if data.user}
<body id="bg">
  <div id="wrapper">
    <header id="header">
      <img src={logo} alt="logo" id="logo">
      <div id="userinfo">
        <ul id="userinfo_support">
          <li>
            <a href="/upload">Upload</a>
          </li>
          <li>
            <a href="/invites">Invite</a>
          </li>
          <li>
            <a href="/donations">Donate</a>
          </li>
          <li>
            <a href="/staff">Staff</a>
          </li>
        </ul>
        <ul id="userinfo_stats">
          <li>
            <a href="/">Up:</a>
            <span> {info.up} MB</span>
          </li>
          <li>
            <a href="/">Down:</a>
            <span>{info.down} MB</span>
          </li>
          <li>
            <a href="/">Ratio:</a>
            <span>{info.ratio}</span>
          </li>
        </ul>
      </div>
    </header>
    <div id="navbar">
      <div id="menu">
        <ul>
          <li id='first_father' class="dropdown">
            <a href="/" class="dropdown_a">Containers</a>
            <div class="dropdown_content" id="first_dropdown">
              <a href="https://jellyfin.mustlane.com">Jellyfin</a>
              <a href="https://mustlane.com">Jellyseer</a>
              <a href="https://mustlane.com">Immich</a>
            </div>
          </li>
          <li id="Requests">
            <a href="/">Requests</a>
          </li>
          <li id="Rules">
            <a href="/">Rules</a>
          </li>
          <li id="Support">
            <a href="/">Support</a>
          </li>
          <li id='second_father' class="dropdown">
            <a href="/"> {data.user.username} </a>
            <div class="dropdown_content" id="second_dropdown">
              <a href="/profile">Profile</a>
              <a href="/">Settings</a>
              <a href="/">Log Out</a>
            </div>
          </li>
          <li id="burger_li" class="dropdown">
            <img src="{menu}" id="burger" alt="menu">
          </li>
        </ul>
      </div>
      <div id="searchbars">
        <ul>
          {#if data.user.hasVideo}
          <li>
              <input id="Movies" placeholder="Movies">
          </li>
          <li>
              <input id="Series" placeholder="Series">
          </li>
          {/if}
          {#if data.user.hasAudio}
          <li>
              <input id="Music" placeholder="Music">
          </li>
          {/if}
          {#if data.user.hasMedia}
          <li>
              <input id="Images" placeholder="Images">
          </li>
          {/if}
          <li>
              <input id="Requests" placeholder="Requests">
          </li>
          <li>
              <input id="Users" placeholder="Users">
          </li>
        </ul>
      </div>
    </div>
    {@render children()}
    <footer>
        <h1>DAT IS A FOOTER FO SHO</h1>
    </footer>
    </div>    
</body>
{/if}

<style lang='scss'>
@use '$lib/css/variables' as variables;
@use 'sass:color';

* {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

body {
    background-color: variables.$body;
    box-sizing: border-box;
    color: variables.$text;
    font-size: 12px;
    line-height: 1.6;
    margin: 0 8px;
    font-family: variables.$system_ui;
}

#wrapper {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 1020px;
}

// HEADER

header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    img {
        height: 75px;
        padding: 20px 0 0 20px;
    }
}

#userinfo {
    margin-top: 20px;

    ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        gap: 10px;

        li {

            a, span {
                font-size: 13px;
            }

            a {
                text-decoration: none;
                color: variables.$userinfo_a;
            }

            span {
                color: variables.$text;
            }

            a:hover {
                color: variables.$userinfo_hover
            }
        }
    }
}

// NAVBAR

#navbar {
    display: flex;
    flex-direction: column;
    border-radius: 5px 5px 0 0;

    div {
        display: flex;
        flex-direction: row;
        

        ul {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
        }
    }
}

// NAVBAR - MENU

#menu {
    border-radius: 7px 7px 0 0;
    ul {
        width: 100%;

      li {
          position: relative;
          list-style: none;
          line-height: 0;

          &:first-child {
            border-radius: 7px 0 0 0;
          }

          &:last-child {
            border-radius: 0 7px 0 0;
          }

          div {
            display: none;
          }

          &.dropdown:hover .dropdown_content {
            display: inline-flex;
            width: 100%;
            flex-direction: column;
          }

            &:not(:last-child) {
                width: 100%;
                background-color: variables.$menu;
            }

            &:last-child>img {
                width: 50px;
            };

            a {
                display: block;
                height: 100%;
                text-decoration: none;
                text-align: center;
                line-height: 50px;
                font-size: 13px;
                font-weight: 900;
                color: variables.$text;

                &:hover {
                    background-color: variables.$menu_a_hover;
                }

                &:active {
                    background-color: variables.$menu_a_active;
                }
            }

            div {
              position: absolute;
              top: 100%;
              left: 0;
              background-color: variables.$menu;
              min-width: 100%;

              a {
              font-weight: 500;
              text-align: left;
              line-height: 32px;
              padding: 0 8px;
              }
            }
        }
}
}

@for $i from 1 through 7 {
    #menu > ul > li:nth-child(7n - #{$i}) {
        background-color: color.adjust($color: variables.$menu, $lightness: variables.$step_str * $i);
    }
}

// NAVBAR - SEARCHBARS

#searchbars {
    background-color: variables.$searchbar_ul;

    ul {
        display: flex;
        justify-content: space-evenly;
        gap: 10px;
        margin: 10px 10px;

        li {
            display: inline-block;
            flex: 1 1 auto;

            input {
              box-sizing: border-box;
                width: 100%;
                padding: 5px;
                height: 30px;
                border: none;
                border-radius: 2.5px;
                background-color: variables.$searchbar_input_bg;
                color: variables.$text;

                &:focus {
                    background-color: variables.$body;
                    outline: none;
                    color: variables.$searchbar_font_focus;
                }
            }
        }
    }
}
</style>
