import { scrapeBooks } from "../services/scrapeBooks.js"

function runCompetitorMonitor() {
    scrapeBooks();
}

export { runCompetitorMonitor }