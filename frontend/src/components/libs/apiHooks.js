import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'


/**
 * Fetches GET-request
 *
 * @param url url
 *
 * @return json response
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
 * Fetches PUT-request
 *
 * @param url url
 * @param arg data to send
 *
 * @return http response code
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
 * Fetches POST-request
 *
 * @param url url
 * @param arg data to send
 *
 * @return http response code
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
 * Fetches POST-request with 'application/octet-stream' header
 *
 * @param url url
 * @param arg data to send
 *
 * @return http response code
 */
export async function postFileRequest(url, { arg }) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream ',
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
 * Hook for getting ingredients list
 *
 * Usage:
 * const { ingredients, isLoading, isError } = useIngredients()
 *
 * if (isLoading) return <div>Loading...</div>
 * if (isError) return <div>Error loading ingredients ({isError.status})</div>
 *
 * return (
 *   <ul>
 *     {ingredients?.map((item) => (
 *       <li key={item.id}>{item.name}</li>
 *     ))}
 *   </ul>
 * )
 *
 * @returns {{ ingredients: Array|undefined, isLoading: boolean, isError: Error|undefined }} Object containing fetched ingredients, loading state, and error object.
 */
export function useIngredients() {
    const { data, error, isLoading  } = useSWR("/ingredients", getRequest)

    return {
        ingredients: data,
        isLoading,
        isError: error,
    }
}

/**
 * Hook for updating the ingredients list
 *
 * Usage:
 * const { trigger, isMutating, error } = useUpdateIngredients()
 *
 * const handleUpdate = async () => {
 *   try {
 *     const status = await trigger(updatedIngredients)
 *     console.log('Update success:', status)
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
 * @returns {{ trigger: Function, error: Error|undefined, isMutating: boolean }} Object containing trigger function, error object, and mutation state.
 */
export function useUpdateIngredients() {
    const { trigger, error, isMutating } = useSWRMutation(
        '/ingredients',
        putRequest
    )

    return {
        trigger,
        error,
        isMutating,
    }
}

/**
 * Hook for getting recipes list
 *
 * Usage:
 * const { recipes, isLoading, isError } = useRecipes()
 *
 * if (isLoading) return <div>Loading recipes...</div>
 * if (isError) return <div>Error loading recipes ({isError.status})</div>
 *
 * return (
 *   <ul>
 *     {recipes?.map((recipe) => (
 *       <li key={recipe.id}>{recipe.name}</li>
 *     ))}
 *   </ul>
 * )
 *
 * @returns {{ recipes: Array|undefined, isLoading: boolean, isError: Error|undefined }} Object containing fetched recipes, loading state, and error object.
 */
export function useRecipes() {
    const { data, error, isLoading  } = useSWR("/recipes", getRequest)

    return {
        recipes: data,
        isLoading,
        isError: error,
    }
}

/**
 * Hook for updating the recipes list
 *
 * Usage:
 * const { trigger, isMutating, error } = useUpdateRecipes()
 *
 * const handleSave = async () => {
 *   try {
 *     const status = await trigger(newRecipes)
 *     console.log('Recipes updated successfully')
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
 * @returns {{ trigger: Function, error: Error|undefined, isMutating: boolean }} Object containing trigger function, error object, and mutation state.
 */
export function useUpdateRecipes() {
    const { trigger, error, isMutating } = useSWRMutation(
        '/recipes',
        putRequest
    )

    return {
        trigger,
        error,
        isMutating,
    }
}

/**
 * Hook for getting currently selected recipe
 *
 * Usage:
 * const { recipe, isLoading, isError } = useGetSelectedRecipe()
 *
 * if (isLoading) return <div>Loading selected recipe...</div>
 * if (isError) return <div>Error fetching selection ({isError.status})</div>
 *
 * return <div>Selected: {recipe?.name}</div>
 *
 * @returns {{ recipe: Object|undefined, isLoading: boolean, isError: Error|undefined }} Object containing selected recipe data, loading state, and error object.
 */
export function useGetSelectedRecipe() {
    const { data, error, isLoading  } = useSWR("/select-recipe", getRequest)

    return {
        recipe: data,
        isLoading,
        isError: error,
    }
}

/**
 * Hook for selecting a recipe
 *
 * Usage:
 * const { selectRecipe, isMutating, isError } = useSelectRecipe()
 *
 * const handleSelect = async (recipeId) => {
 *   try {
 *     await selectRecipe({ "id": 1, "portion": 1.5 })
 *   } catch (err) {
 *     console.error('Selection failed:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={() => handleSelect(1)} disabled={isMutating}>
 *     Select Recipe 1
 *   </button>
 * )
 *
 * @returns {{ selectRecipe: Function, result: number|Object|undefined, isMutating: boolean, isError: Error|undefined }} Object containing select handler, result, mutation state, and error object.
 */
export function useSelectRecipe() {
    const { trigger, httpCode, error, isMutating } = useSWRMutation(
        '/select-recipe',
        postRequest
    )

    return {
        selectRecipe: trigger,
        result: httpCode,
        isMutating,
        isError: error,
    }
}

/**
 * Hook for getting system configuration
 *
 * Usage:
 * const { recipe: config, isLoading, isError } = useGetConfig()
 *
 * if (isLoading) return <div>Loading settings...</div>
 * if (isError) return <div>Error loading config ({isError.status})</div>
 *
 * return <div>Theme: {config?.theme}</div>
 *
 * @returns {{ recipe: Object|undefined, isLoading: boolean, isError: Error|undefined }} Object containing configuration data, loading state, and error object.
 */
export function useGetConfig() {
    const { data, error, isLoading  } = useSWR("/config", getRequest)

    return {
        recipe: data,
        isLoading,
        isError: error,
    }
}

/**
 * Hook for updating system configuration
 *
 * Usage:
 * const { updateConfig, isMutating, isError } = useUpdateConfig()
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
 *   <button onClick={() => handleSaveConfig(config_object)} disabled={isMutating}>
 *     Save Config
 *   </button>
 * )
 *
 * @returns {{ updateConfig: Function, result: number|Object|undefined, isMutating: boolean, isError: Error|undefined }} Object containing config update trigger, result, mutation state, and error object.
 */
export function useUpdateConfig() {
    const {trigger, httpCode, error, isMutating} = useSWRMutation(
        '/config',
        postRequest
    )

    return {
        updateConfig: trigger,
        result: httpCode,
        isMutating,
        isError: error,
    }
}

/**
 * Hook for setting pump state
 *
 * Usage:
 * const { setPumpState, isMutating, isError } = useSetPumpState()
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
 *   <button onClick={() => handleTogglePump({"pump": 0, "state": -1})} disabled={isMutating}>
 *     Turn On Pump 1
 *   </button>
 * )
 *
 * @returns {{ setPumpState: Function, result: number|Object|undefined, isMutating: boolean, isError: Error|undefined }} Object containing pump state trigger, result, mutation state, and error object.
 */
export function useSetPumpState() {
    const {trigger, data, error, isMutating} = useSWRMutation(
        '/set-pump-state',
        postRequest
    )

    return {
        setPumpState: trigger,
        result: data,
        isMutating,
        isError: error,
    }
}

/**
 * Hook for triggering a system restart
 *
 * Usage:
 * const { restart, result, isError} = useRestart()
 *
 * const handleRestart = async () => {
 *   try {
 *     await triggerRestart()
 *     console.log('Restart initiated')
 *   } catch (err) {
 *     console.error('Restart failed:', err.status)
 *   }
 * }
 *
 * return (
 *   <button onClick={handleRestart} disabled={isMutating}>
 *     Restart Device
 *   </button>
 * )
 *
 * @returns {{ restart: Function, result: number|Object|undefined, isMutating: boolean, isError: Error|undefined }} Object containing restart trigger, result, mutation state, and error object.
 */
export function useRestart () {
    const {trigger, data, isMutating, error} = useSWRMutation(
        '/restart',
        postRequest
    )

    return {
        restart: trigger,
        result: data,
        isMutating: isMutating,
        isError: error,
    }
}

/**
 * Hook for updating device firmware
 *
 * Usage:
 * const { updateFirmware, isMutating, isError } = useFirmwareUpdate()
 *
 * const handleUpload = async (file) => {
 *   const formData = new FormData()
 *   formData.append('file', file)
 *
 *   try {
 *     await updateFirmware(formData)
 *     console.log('Firmware update started')
 *   } catch (err) {
 *     console.error('Firmware update failed:', err.status)
 *   }
 * }
 *
 * return (
 *   <input type="file" onChange={(e) => handleUpload(e.target.files[0])} disabled={isMutating} />
 * )
 *
 * @returns {{ updateFirmware: Function, result: number|Object|undefined, isMutating: boolean, isError: Error|undefined }} Object containing firmware update trigger, result, mutation state, and error object.
 */
export function useFirmwareUpdate() {
    const {trigger, data, error, isMutating} = useSWRMutation(
        '/firmware-update',
        postFileRequest
    )

    return {
        updateFirmware: trigger,
        result: data,
        isMutating,
        isError: error,
    }
}