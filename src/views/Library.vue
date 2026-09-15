<script setup>
import { computed, ref } from 'vue'
import PaywallModal from '../components/PaywallModal.vue'
import { downloadBook } from '../utils/downloadBook'

const search = ref('')
const selected = ref('All levels')
const sort = ref('featured')
const selectedBook = ref(null)
const showPaywall = ref(false)
const downloadError = ref('')
const levels = ['All levels', 'A1–A2', 'B1–B2', 'C1–C2']
const books = [
    { title: 'The Little Lantern', author: 'JoeOkat', level: 'A1–A2', type: 'Short story', time: 12, price: 'Free', color: 'coral', description: 'A warm story about finding courage in small places.', downloadUrl: '/ebooks/the-little-lantern.pdf', downloadName: 'the-little-lantern.pdf' },
    // { title: 'A City of Small Things', author: 'Lena Park', level: 'B1–B2', type: 'Easy reader', time: 28, price: '$0.49', color: 'blue', description: 'Discover the extraordinary in an ordinary day.', downloadUrl: '/ebooks/a-city-of-small-things.pdf', downloadName: 'a-city-of-small-things.pdf' },
    // { title: 'The Last Letter', author: 'Noah Williams', level: 'B1–B2', type: 'Short story', time: 18, price: '$0.19', color: 'green', description: 'A thoughtful story about friendship, distance, and home.', downloadUrl: '/ebooks/the-last-letter.pdf', downloadName: 'the-last-letter.pdf' },
    // { title: 'Beyond the Stars', author: 'Ari Cole', level: 'C1–C2', type: 'Novella', time: 42, price: '$0.99', color: 'purple', description: 'An inspiring journey for curious minds and brave dreamers.' }
]

const filteredBooks = computed(() => books.filter(book => (selected.value === 'All levels' || book.level === selected.value) && `${book.title} ${book.author} ${book.description}`.toLowerCase().includes(search.value.toLowerCase())).sort((a, b) => sort.value === 'free' ? (b.price === 'Free') - (a.price === 'Free') : 0))

function startDownload(book) {
    downloadError.value = ''
    if (downloadBook(book)) return
    downloadError.value = `The PDF for ${book.title} is not available yet.`
}

function selectBook(book) {
    selectedBook.value = book
    if (book.price === 'Free') {
        startDownload(book)
        return
    }
    downloadError.value = ''
    showPaywall.value = true
}

function handlePaymentSuccess() {
    showPaywall.value = false
    if (selectedBook.value) startDownload(selectedBook.value)
}
</script>

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
                        <footer><strong :class="{ free: book.price === 'Free' }">{{ book.price }}</strong><button type="button" @click="selectBook(book)"> {{
                            book.price === 'Free' ? 'Download' : 'Buy' }} →</button></footer>
                    </div>
                </article>
            </div>
            <p v-if="!filteredBooks.length" class="empty">No stories found. Try another search or level.</p>
            <p v-if="downloadError" class="empty">{{ downloadError }}</p>
        </section>
        <section class="callout"><span>✦</span>
            <div><span class="eyebrow">MADE FOR PROGRESS</span>
                <h2>Read at your level. Grow at your pace.</h2>
                <p>Every story includes useful vocabulary and clear language so you can improve naturally.</p>
            </div><a class="light" href=#books target="_blank">Download a book →</a>
        </section>
    </main>
    <PaywallModal
        :open="showPaywall"
        :title="selectedBook?.title"
        :price="selectedBook?.price"
        @close="showPaywall = false"
        @success="handlePaymentSuccess"
    />
</template>

