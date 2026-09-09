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
 * Hook for setting pump state.
 *
 * @example
 * const { setPumpState, result, isMutating, error } = useSetPumpState()
 *
 * const handleTogglePump = async (pumpState) => {
 *   try {
 *     await setPumpState(pumpState)
 *   } catch (err) {
 *     console.error('Failed to set pump state:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={() => handleTogglePump({ pump: 0, state: 1 })} disabled={isMutating}>
 *     {isMutating ? 'Updating...' : 'Turn On Pump 0'}
 *   </button>
 * )
 *
 * @returns {{ setPumpState: Function, result: number|undefined, isMutating: boolean, error: Error|undefined }} Object containing pump state trigger function, HTTP status result, mutation state, and error object.
 */
export function useSetPumpState() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        '/set-pump-state',
        postRequest
    )

    return {
        setPumpState: trigger,
        result: data,
        isMutating,
        error,
    }
}

/**
 * Hook for triggering a system restart.
 *
 * @example
 * const { restart, result, isMutating, error } = useRestart()
 *
 * const handleRestart = async () => {
 *   try {
 *     await restart()
 *     console.log('Restart initiated successfully')
 *   } catch (err) {
 *     console.error('Restart failed:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={handleRestart} disabled={isMutating}>
 *     {isMutating ? 'Restarting...' : 'Restart Device'}
 *   </button>
 * )
 *
 * @returns {{ restart: Function, result: number|undefined, isMutating: boolean, error: Error|undefined }} Object containing restart trigger function, HTTP status result, mutation state, and error object.
 */
export function useRestart() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        '/restart',
        postRequest
    )

    return {
        restart: trigger,
        result: data,
        isMutating,
        error,
    }
}

/**
 * Hook for updating device firmware using binary stream data.
 *
 * @example
 * const { updateFirmware, result, isMutating, error } = useFirmwareUpdate()
 *
 * const handleUpload = async (file) => {
 *   if (!file) return
 *   try {
 *     // Pass the File or Blob object directly (sent as application/octet-stream)
 *     await updateFirmware(file)
 *     console.log('Firmware update started')
 *   } catch (err) {
 *     console.error('Firmware update failed:', err.status)
 *   }
 * }
 *
 * return (
 *   <input
 *     type="file"
 *     onChange={(e) => handleUpload(e.target.files[0])}
 *     disabled={isMutating}
 *   />
 * )
 *
 * @returns {{ updateFirmware: Function, result: number|undefined, isMutating: boolean, error: Error|undefined }} Object containing firmware update trigger function, HTTP status result, mutation state, and error object.
 */
export function useFirmwareUpdate() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        '/firmware-update',
        postFileRequest
    )

    return {
        updateFirmware: trigger,
        result: data,
        isMutating,
        error,
    }
}