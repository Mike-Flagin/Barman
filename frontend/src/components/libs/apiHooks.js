import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'


/**
 * Executes a GET request.
 *
 * @param {string} url - Endpoint path relative to the base URL
 * @returns {Promise<any>} Parsed JSON response
 */
export const getRequest = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
        const error = new Error('Failed to fetch')
        error.status = res.status
        throw error
    }
    return res.json()
}

/**
 * Executes a PUT request with JSON payload.
 *
 * @param {string} url - Endpoint path relative to the base URL
 * @param {{ arg: any }} options - Mutation options containing data to send
 * @returns {Promise<number>} HTTP status code
 */
export async function putRequest(url, { arg }) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    })

    if (!res.ok) {
        const error = new Error('Failed to fetch')
        error.status = res.status
        throw error
    }

    return res.status
}

/**
 * Executes a POST request with JSON payload.
 *
 * @param {string} url - Endpoint path relative to the base URL
 * @param {{ arg: any }} options - Mutation options containing data to send
 * @returns {Promise<number>} HTTP status code
 */
export async function postRequest(url, { arg }) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    })

    if (!res.ok) {
        const error = new Error('Failed to fetch')
        error.status = res.status
        throw error
    }

    return res.status
}

/**
 * Executes a POST request with 'application/octet-stream' header for binary data.
 *
 * @param {string} url - Endpoint path relative to the base URL
 * @param {{ arg: Blob|ArrayBuffer|File }} options - Mutation options containing binary body
 * @returns {Promise<number>} HTTP status code
 */
export async function postFileRequest(url, { arg }) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        body: arg
    })

    if (!res.ok) {
        const error = new Error('Failed to fetch')
        error.status = res.status
        throw error
    }

    return res.status
}


/**
 * Hook for getting ingredients list.
 *
 * @example
 * const { ingredients, isLoading, error } = useIngredients()
 *
 * if (isLoading) return <div>Loading...</div>
 * if (error) return <div>Error loading ingredients ({error.status})</div>
 *
 * return (
 *   <ul>
 *     {ingredients?.map((item) => (
 *       <li key={item.id}>{item.name}</li>
 *     ))}
 *   </ul>
 * )
 *
 * @returns {{ ingredients: Array|undefined, isLoading: boolean, error: Error|undefined }} Object containing fetched ingredients, loading state, and error object.
 */
export function useIngredients() {
    const { data, error, isLoading } = useSWR('/ingredients', getRequest)

    return {
        ingredients: data,
        isLoading,
        error,
    }
}

/**
 * Hook for updating the ingredients list.
 *
 * @example
 * const { trigger, result, isMutating, error } = useUpdateIngredients()
 *
 * const handleUpdate = async () => {
 *   try {
 *     const status = await trigger(updatedIngredients)
 *     console.log('Update success status:', status)
 *   } catch (err) {
 *     console.error('Update failed with status:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={handleUpdate} disabled={isMutating}>
 *     {isMutating ? 'Saving...' : 'Save Ingredients'}
 *   </button>
 * )
 *
 * @returns {{ trigger: Function, result: number|undefined, isMutating: boolean, error: Error|undefined }} Object containing trigger function, HTTP status result, mutation state, and error object.
 */
export function useUpdateIngredients() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        '/ingredients',
        putRequest
    )

    return {
        trigger,
        result: data,
        isMutating,
        error,
    }
}

/**
 * Hook for getting recipes list.
 *
 * @example
 * const { recipes, isLoading, error } = useRecipes()
 *
 * if (isLoading) return <div>Loading recipes...</div>
 * if (error) return <div>Error loading recipes ({error.status})</div>
 *
 * return (
 *   <ul>
 *     {recipes?.map((recipe) => (
 *       <li key={recipe.id}>{recipe.name}</li>
 *     ))}
 *   </ul>
 * )
 *
 * @returns {{ recipes: Array|undefined, isLoading: boolean, error: Error|undefined }} Object containing fetched recipes, loading state, and error object.
 */
export function useRecipes() {
    const { data, error, isLoading } = useSWR('/recipes', getRequest)

    return {
        recipes: data,
        isLoading,
        error,
    }
}

/**
 * Hook for updating the recipes list.
 *
 * @example
 * const { trigger, result, isMutating, error } = useUpdateRecipes()
 *
 * const handleSave = async () => {
 *   try {
 *     const status = await trigger(newRecipes)
 *     console.log('Recipes updated successfully with status:', status)
 *   } catch (err) {
 *     console.error('Failed to update recipes:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={handleSave} disabled={isMutating}>
 *     {isMutating ? 'Updating...' : 'Update Recipes'}
 *   </button>
 * )
 *
 * @returns {{ trigger: Function, result: number|undefined, isMutating: boolean, error: Error|undefined }} Object containing trigger function, HTTP status result, mutation state, and error object.
 */
export function useUpdateRecipes() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        '/recipes',
        putRequest
    )

    return {
        trigger,
        result: data,
        isMutating,
        error,
    }
}

/**
 * Hook for getting currently selected recipe.
 *
 * @example
 * const { recipe, isLoading, error } = useGetSelectedRecipe()
 *
 * if (isLoading) return <div>Loading selected recipe...</div>
 * if (error) return <div>Error fetching selection ({error.status})</div>
 *
 * return <div>Selected: {recipe?.name}</div>
 *
 * @returns {{ recipe: Object|undefined, isLoading: boolean, error: Error|undefined }} Object containing selected recipe data, loading state, and error object.
 */
export function useGetSelectedRecipe() {
    const { data, error, isLoading } = useSWR('/select-recipe', getRequest)

    return {
        recipe: data,
        isLoading,
        error,
    }
}

/**
 * Hook for selecting a recipe.
 *
 * @example
 * const { selectRecipe, result, isMutating, error } = useSelectRecipe()
 *
 * const handleSelect = async (recipeId) => {
 *   try {
 *     await selectRecipe({ id: recipeId, portion: 1.5 })
 *   } catch (err) {
 *     console.error('Selection failed:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={() => handleSelect(1)} disabled={isMutating}>
 *     {isMutating ? 'Selecting...' : 'Select Recipe 1'}
 *   </button>
 * )
 *
 * @returns {{ selectRecipe: Function, result: number|undefined, isMutating: boolean, error: Error|undefined }} Object containing select trigger function, HTTP status result, mutation state, and error object.
 */
export function useSelectRecipe() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        '/select-recipe',
        postRequest
    )

    return {
        selectRecipe: trigger,
        result: data,
        isMutating,
        error,
    }
}

/**
 * Hook for getting system configuration.
 *
 * @example
 * const { config, isLoading, error } = useGetConfig()
 *
 * if (isLoading) return <div>Loading settings...</div>
 * if (error) return <div>Error loading config ({error.status})</div>
 *
 * return <div>Theme: {config?.theme}</div>
 *
 * @returns {{ config: Object|undefined, isLoading: boolean, error: Error|undefined }} Object containing configuration data, loading state, and error object.
 */
export function useGetConfig() {
    const { data, error, isLoading } = useSWR('/config', getRequest)

    return {
        config: data,
        isLoading,
        error,
    }
}

/**
 * Hook for updating system configuration.
 *
 * @example
 * const { updateConfig, result, isMutating, error } = useUpdateConfig()
 *
 * const handleSaveConfig = async (newSettings) => {
 *   try {
 *     await updateConfig(newSettings)
 *   } catch (err) {
 *     console.error('Config update failed:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={() => handleSaveConfig({ theme: 'dark' })} disabled={isMutating}>
 *     {isMutating ? 'Saving...' : 'Save Config'}
 *   </button>
 * )
 *
 * @returns {{ updateConfig: Function, result: number|undefined, isMutating: boolean, error: Error|undefined }} Object containing config update trigger function, HTTP status result, mutation state, and error object.
 */
export function useUpdateConfig() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        '/config',
        putRequest
    )

    return {
        updateConfig: trigger,
        result: data,
        isMutating,
        error,
    }
}

/**
 * Send pump state update
 * @param {Object} data - e.g., { pump: 0, state: 1 }
 * @returns {Promise<number>} HTTP response code (200, 500, etc.)
 *
 * @example
 * const handleTogglePump = async () => {
 *     const statusCode = await setPumpState({ pump: 0, state: 1 })
 *
 *     if (statusCode === 200) {
 *         console.log('Pump updated successfully')
 *     } else {
 *         console.error('Request failed with status:', statusCode)
 *     }
 * }
 */
export async function setPumpState(data) {
    return postRequest('/set-pump-state', data)
}

/**
 * Triggers a system restart.
 *
 * @returns {Promise<number>} HTTP response code (e.g., 200, 500)
 *
 * @example
 * const handleRestart = async () => {
 *     const status = await restart()
 *     if (status === 200) {
 *         console.log('Restart initiated successfully')
 *     } else {
 *         console.error('Restart failed with status:', status)
 *     }
 * }
 */
export async function restart() {
    return postRequest("/restart", undefined)
}

/**
 * Sends a binary firmware update stream to the device.
 *
 * @param {File|Blob} file - Binary file or blob object to send
 * @returns {Promise<number>} HTTP response code (e.g., 200, 500)
 *
 * @example
 * const handleUpload = async (event) => {
 *     const file = event.target.files[0]
 *     if (!file) return
 *
 *     const status = await updateFirmware(file)
 *     if (status === 200) {
 *         console.log('Firmware update started')
 *     } else {
 *         console.error('Firmware update failed with status:', status)
 *     }
 * }
 */
export async function updateFirmware(file) {
    return postFileRequest('/firmware-update', file)
}

/**
 * Get redirect to main if no Wi-Fi connection is needed
 *
 * @returns {Promise<string>} Redirect address
 */
export async function withoutConnectionRedirect() {
    const res = await fetch("/wifi/without-connection")

    if (!res.ok && res.status !== 302) {
        const error = new Error('Failed to check redirect')
        error.status = res.status
        throw error
    }

    return res.headers.get('Location')
}

/**
 * Fetches the list of available Wi-Fi networks.
 *
 * @returns {Promise<Array>} List of available Wi-Fi networks
 */
export async function getAvailableNetworks() {
    return getRequest('/wifi/scan')
}

/**
 * Connect to any saved and available Wi-Fi network.
 *
 * @returns {Promise<{ status: string }>} Response
 */
export async function connectToSavedWifi() {
    const res = await fetch('/wifi/connect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()

    if (!res.ok || data.status !== 'ok') {
        const error = new Error(data.error || 'Failed to connect to saved Wi-Fi')
        error.status = res.status
        throw error
    }

    return data
}

/**
 * Connect to Wi-Fi network by SSID.
 *
 * @param {string} ssid - SSID
 * @returns {Promise<{ status: string }>} Response
 */
export async function connectToWifi(ssid) {
    const res = await fetch('/wifi/connect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ssid: ssid }),
    })

    const data = await res.json()

    if (!res.ok || data.status !== 'ok') {
        const error = new Error(data.error || 'Failed to connect to Wi-Fi')
        error.status = res.status
        throw error
    }

    return data
}

/**
 * Get Wi-Fi status.
 *
 * @returns {Promise<Object>} Current connection status
 */
export async function getWifiStatus() {
    const res = await fetch('/wifi/status')
    const data = await res.json()

    if (!res.ok || data.error) {
        const error = new Error(data.error || 'Failed to get Wi-Fi status')
        error.status = res.status
        throw error
    }

    return data
}

/**
 * Get saved Wi-Fi networks.
 *
 * @returns {Promise<Array|Object>} List of saved networks
 */
export async function getSavedNetworks() {
    const res = await fetch('/wifi/networks')
    const data = await res.json()

    if (!res.ok || data.error) {
        const error = new Error(data.error || 'Failed to fetch saved networks')
        error.status = res.status
        throw error
    }

    return data
}

/**
 * Save new Wi-Fi network.
 *
 * @param {Object} networkData - Network data, e.g. {"ssid": "MyWiFi", "password": "secret123", "priority": 10}
 * @returns {Promise<{ status: string }>} Response
 */
export async function addSavedNetwork(networkData) {
    const res = await fetch('/networks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(networkData),
    })

    const data = await res.json()

    if (!res.ok || data.status !== 'ok') {
        const error = new Error(data.error || 'Failed to add network')
        error.status = res.status
        throw error
    }

    return data
}

/**
 * Update saved Wi-Fi network.
 *
 * @param {string} ssid - SSID
 * @param {Object} networkData - New network data
 * @returns {Promise<{ status: string }>} Response
 */
export async function updateSavedNetwork(ssid, networkData) {
    const res = await fetch(`/networks/${encodeURIComponent(ssid)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(networkData),
    })

    const data = await res.json()

    if (!res.ok || data.status !== 'ok') {
        const error = new Error(data.error || 'Failed to update network')
        error.status = res.status
        throw error
    }

    return data
}

/**
 * Delete saved Wi-Fi network.
 *
 * @param {string} ssid - SSID
 * @returns {Promise<{ status: string }>} Response
 */
export async function deleteSavedNetwork(ssid) {
    const res = await fetch(`/networks/${encodeURIComponent(ssid)}`, {
        method: 'DELETE',
    })

    const data = await res.json()

    if (!res.ok || data.status !== 'ok') {
        const error = new Error(data.error || 'Failed to delete network')
        error.status = res.status
        throw error
    }

    return data
}