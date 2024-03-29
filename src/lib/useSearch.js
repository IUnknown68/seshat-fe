import {
  reactive,
  computed,
} from 'vue';
import { uid } from 'quasar';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const STORAGE_SEARCH_KEY = 'search:';
const AXIOS_TIMEOUT = 10000;
const storage = sessionStorage;

const mapOfSearches = reactive(new Map());
const listOfSearches = computed(() => [...mapOfSearches.values()].sort((a, b) => b.date - a.date));

//const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: '/api',
  timeout: AXIOS_TIMEOUT,
});

//------------------------------------------------------------------------------
function useSearch() {
  return {
    mapOfSearches,
    listOfSearches,

    createSearch,
    deleteSearch,
  };
}

//------------------------------------------------------------------------------
export function useSearchFromRoute() {
  const router = useRouter();
  const route = useRoute();

  const searchId = computed({
    get: () => route.params?.searchId,

    // "set" navigates to the result page:
    set(newValue) {
      if (typeof newValue !== 'string') {
        throw new TypeError('Expected searchId to be a string.');
      }
      router.push({ name: 'result', params: { searchId: newValue } });
    },
  });

  const search = computed(() => mapOfSearches.get(searchId.value));

  return {
    searchId,
    search,
  };
}

//------------------------------------------------------------------------------
function createSearch(query) {
  const id = uid();
  const search = reactive({
    id,
    date: new Date(),
    query,
    error: null,
    busy: false,
    result: [],
  });

  search.run = runSearch.bind(null, search);

  mapOfSearches.set(id, search);
  storeSearch(search);
  return search;
}

//------------------------------------------------------------------------------
async function runSearch(search, count = SESHAT_RESULTS_PER_PAGE) {
  try {
    search.error = null;
    search.busy = true;

    const response = await api.post('query', {
      query: search.query,
      start: search.result.length,
      count,
    });

    search.result.push(...response.data.map((doc) => reactive({
      ...doc,
      date: new Date(doc.date),
    })));

    storeSearch(search);
  } catch (err) {
    const bodyJson = err.response?.data;
    if (bodyJson && (typeof bodyJson === 'object') && bodyJson.message) {
      search.error = new Error(bodyJson.message);
      if (bodyJson.name) {
        search.error.name = bodyJson.name;
      }
    } else {
      search.error = err;
    }
  } finally {
    search.busy = false;
  }
}

//------------------------------------------------------------------------------
function storeSearch(search) {
  storage.setItem(
    `${STORAGE_SEARCH_KEY}${search.id}`,
    JSON.stringify(search, replacer),
  );
}

//------------------------------------------------------------------------------
function loadSearch(id) {
  const str = storage.getItem(`${STORAGE_SEARCH_KEY}${id}`);
  if (!str) {
    return;
  }
  const search = reactive(JSON.parse(str, reviver));
  search.error = null;
  search.busy = false;
  search.run = runSearch.bind(null, search);
  mapOfSearches.set(search.id, search);
}

//------------------------------------------------------------------------------
function deleteSearch(id) {
  mapOfSearches.delete(id);
  storage.removeItem(`${STORAGE_SEARCH_KEY}${id}`);
}

//------------------------------------------------------------------------------
function reviver(key, value) {
  if (key === 'date') {
    return new Date(value);
  }
  return value;
}

//------------------------------------------------------------------------------
function replacer(key, value) {
  if (['error', 'busy', 'start', 'count'].includes(key)) {
    return undefined;
  }
  return value;
}

//------------------------------------------------------------------------------
function loadRecentSearches() {
  try {
    for (let n = 0; n < storage.length; ++n) {
      const key = storage.key(n);
      if (key.startsWith(STORAGE_SEARCH_KEY)) {
        loadSearch(key.slice(STORAGE_SEARCH_KEY.length));
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

loadRecentSearches();

export default useSearch;
