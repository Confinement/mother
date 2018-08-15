let Store = {}

export let resetStore = () => {
	for (const k in Store)
		if (Store.hasOwnProperty(k))
			delete Store[k]
}

export default Store