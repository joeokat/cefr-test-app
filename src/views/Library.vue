<template>
    <main class="library">
        <section class="hero">
            <div>
                <span class="eyebrow">READ · LEARN · GROW</span>
                <h1>Stories that make English <i>stick.</i></h1>
                <p>Build confidence one page at a time with friendly ebooks and stories made for English learners.</p>
                <a class="primary" href="#books">Explore the library <b>→</b></a>
            </div>
            <div class="art" aria-hidden="true">
                <div class="circle" />
                <div class="book back" />
                <div class="book front"><strong>The</strong><br><strong>PRETTY</strong><br><strong>ONES</strong><br><strong>are not yet</strong><br><strong>Born</strong></div>
            </div>
        </section>

        <section id="books" class="content">
            <div class="heading">
                <div><span class="eyebrow">YOUR NEXT READ</span>
                    <h2>Find your perfect story</h2>
                </div><label class="search">⌕ <input v-model="search" placeholder="Search titles, topics..." /></label>
            </div>
            <div class="filters">
                <div><button v-for="level in levels" :key="level" :class="{ active: selected === level }"
                        @click="selected = level">{{ level }}</button></div><select v-model="sort">
                    <option value="featured">Featured first</option>
                    <option value="free">Free first</option>
                </select>
            </div>
            <div class="grid">
                <article v-for="book in filteredBooks" :key="book.title" class="card">
                    <div class="cover" :class="book.color"><small>{{ book.level }}</small><strong>{{ book.title
                            }}</strong><span>{{ book.author }}</span><b>✦</b></div>
                    <div class="details"><small>{{ book.type }} · {{ book.time }} min read</small>
                        <h3>{{ book.title }}</h3>
                        <p>{{ book.description }}</p>
                        <footer><strong :class="{ free: book.price === 'Free' }">{{ book.price }}</strong><button> {{
                            book.price === 'Free' ? 'Download' : 'Buy' }} →</button></footer>
                    </div>
                </article>
            </div>
            <p v-if="!filteredBooks.length" class="empty">No stories found. Try another search or level.</p>
        </section>
        <section class="callout"><span>✦</span>
            <div><span class="eyebrow">MADE FOR PROGRESS</span>
                <h2>Read at your level. Grow at your pace.</h2>
                <p>Every story includes useful vocabulary and clear language so you can improve naturally.</p>
            </div><a class="light" href=https://whatsapp.com/channel/0029Vb5k0yeFi8xZMhyvel0g target="_blank">Start reading →</a>
        </section>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const selected = ref('All levels')
const sort = ref('featured')
const levels = ['All levels', 'A1–A2', 'B1–B2', 'C1–C2']
const books = [
    { title: 'The Little Lantern', author: 'JoeOkat', level: 'A1–A2', type: 'Short story', time: 12, price: 'Free', color: 'coral', description: 'A warm story about finding courage in small places.' },
    { title: 'A City of Small Things', author: 'Lena Park', level: 'B1–B2', type: 'Easy reader', time: 28, price: '$0.49', color: 'blue', description: 'Discover the extraordinary in an ordinary day.' },
    { title: 'The Last Letter', author: 'Noah Williams', level: 'B1–B2', type: 'Short story', time: 18, price: 'Free', color: 'green', description: 'A thoughtful story about friendship, distance, and home.' },
    { title: 'Beyond the Stars', author: 'Ari Cole', level: 'C1–C2', type: 'Novella', time: 42, price: '$0.99', color: 'purple', description: 'An inspiring journey for curious minds and brave dreamers.' }
]
const filteredBooks = computed(() => books.filter(book => (selected.value === 'All levels' || book.level === selected.value) && `${book.title} ${book.author} ${book.description}`.toLowerCase().includes(search.value.toLowerCase())).sort((a, b) => sort.value === 'free' ? (b.price === 'Free') - (a.price === 'Free') : 0))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap');

:global(*) {
    box-sizing: border-box
}

:global(body) {
    margin: 0;
    background: #f8faf6;
    color: #183c3a;
    font-family: 'DM Sans', sans-serif
}

.library {
    max-width: 1440px;
    margin: auto;
    padding: 34px clamp(18px, 6vw, 96px) 80px
}

.hero {
    min-height: 390px;
    padding: 58px clamp(25px, 7vw, 100px);
    border-radius: 28px;
    background: #e2f1e7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden
}

.hero>div:first-child {
    max-width: 570px
}

.eyebrow {
    color: #dc735c;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px
}

.hero h1 {
    font: 700 clamp(42px, 5vw, 68px)/1.05 'Playfair Display';
    letter-spacing: -2px;
    margin: 14px 0 20px
}

.hero h1 i {
    color: #dc735c;
    font-style: normal
}

.hero p {
    color: #50716b;
    font-size: 17px;
    line-height: 1.7;
    max-width: 480px
}

.primary,
.light {
    display: inline-block;
    padding: 15px 21px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700
}

.primary {
    background: #1d6961;
    color: #fff;
    margin-top: 18px
}

.primary b {
    margin-left: 18px
}

.art {
    width: 320px;
    height: 270px;
    position: relative
}

.circle {
    position: absolute;
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background: #f8c9a1;
    left: 70px
}

.book {
    position: absolute;
    width: 150px;
    height: 205px;
    border-radius: 7px 14px 14px 7px;
    box-shadow: 12px 15px 20px #183c3a22
}

.back {
    background: #dc735c;
    left: 20px;
    top: 58px;
    transform: rotate(-14deg)
}

.front {
    background: #276d66;
    color: #f8d7ad;
    left: 100px;
    top: 48px;
    padding: 30px 15px;
    font: 18px/1.1 'Playfair Display';
    transform: rotate(12deg)
}

.front strong {
    font-size: 25px
}

.content {
    padding: 80px 0 65px
}

.heading,
.filters,
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px
}

h2 {
    font: 600 38px 'Playfair Display';
    margin: 8px 0
}

.search {
    width: 270px;
    padding: 12px 16px;
    background: #fff;
    border: 1px solid #dbe7df;
    border-radius: 10px;
    color: #78918a
}

.search input {
    border: 0;
    outline: 0;
    width: 85%;
    font: inherit
}

.filters {
    margin: 34px 0 24px
}

.filters button,
select {
    border: 1px solid #dbe7df;
    background: transparent;
    color: #52726d;
    padding: 10px 15px;
    border-radius: 30px;
    font: inherit;
    cursor: pointer;
    margin-right: 8px
}

.filters button.active {
    background: #1d6961;
    border-color: #1d6961;
    color: white
}

select {
    background: #fff;
    border-radius: 8px
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px
}

.card {
    background: #fff;
    border: 1px solid #e6eee8;
    border-radius: 14px;
    overflow: hidden
}

.cover {
    height: 220px;
    padding: 18px;
    position: relative;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center
}

.coral {
    background: #dc765d
}

.blue {
    background: #5083a0
}

.green {
    background: #578b73
}

.purple {
    background: #655b88
}

.cover small {
    position: absolute;
    right: 16px;
    top: 16px
}

.cover strong {
    font: 700 26px/1.08 'Playfair Display';
    max-width: 180px
}

.cover span {
    margin-top: 15px;
    opacity: .8
}

.cover>b {
    position: absolute;
    right: 18px;
    bottom: 13px
}

.details {
    padding: 19px
}

.details>small {
    color: #849b95;
    font-size: 11px;
    text-transform: uppercase
}

.details h3 {
    font-size: 19px;
    margin: 10px 0 7px
}

.details p {
    min-height: 42px;
    color: #708681;
    font-size: 13px;
    line-height: 1.5
}

.details footer {
    border-top: 1px solid #edf1ed;
    padding-top: 14px
}

.details footer strong {
    color: #dc735c
}

.details footer strong.free {
    color: #27836d
}

.details button {
    border: 0;
    background: none;
    color: #1d6961;
    font-weight: 700;
    cursor: pointer
}

.callout {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 32px 40px;
    border-radius: 18px;
    background: #1d6961;
    color: #fff
}

.callout>span {
    font-size: 35px;
    color: #f8c9a1
}

.callout h2 {
    font-size: 29px;
    margin: 6px 0 8px
}

.callout p {
    color: #cae2d7;
    margin: 0
}

.light {
    margin-left: auto;
    background: #f8d7ad;
    color: #24524b;
    white-space: nowrap
}

.empty {
    text-align: center;
    color: #708681
}

@media(max-width:900px) {
    .art {
        transform: scale(.7);
        margin-right: -60px
    }

    .grid {
        grid-template-columns: repeat(2, 1fr)
    }

    .callout {
        flex-wrap: wrap
    }

    .light {
        margin-left: 0
    }
}

@media(max-width:600px) {
    .hero {
        padding: 36px 24px
    }

    .art {
        display: none
    }

    .heading {
        display: block
    }

    .search {
        display: block;
        width: 100%;
        margin-top: 22px
    }

    .filters {
        align-items: flex-start;
        flex-direction: column
    }

    .grid {
        grid-template-columns: 1fr
    }

    .callout {
        padding: 28px 24px
    }
}
</style>
