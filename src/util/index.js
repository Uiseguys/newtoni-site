export const filterPremium = (data, isPremium) => {

  console.log(data)
  if (data && data.allWine) {
    return data.allWine.edges
      .map(edge => edge.node)
  } else {
    return []
  }

}
// const read = (key) => localStorage[key] ? JSON.parse(localStorage[key]) : null
// const write = (key, value) => localStorage[key] = JSON.stringify(value)
// const clear = (key) => localStorage.removeItem(key)

// export const store = {read, write, clear}