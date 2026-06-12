import { monitor } from "../services/monitor.js";
import { scrapeBooks } from "../services/scrapeBooks.js"

function runCompetitorMonitor() {
    scrapeBooks();
    monitor()
}

export { runCompetitorMonitor }