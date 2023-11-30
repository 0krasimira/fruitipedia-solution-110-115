import { html } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../dataService.js"


const editTemp = (item) => html `<section id="edit">
<div class="form">
  <h2>Edit Fruit</h2>
  <form @submit=${submitHandler}class="edit-form">
    <input
      type="text"
      name="name"
      id="name"
      value=${item.name}
      placeholder="Fruit Name"
    />
    <input
      type="text"
      name="imageUrl"
      value=${item.imageUrl}
      id="Fruit-image"
      placeholder="Fruit Image URL"
    />
    <textarea
      id="fruit-description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
    >${item.description}</textarea>
    <textarea
      id="fruit-nutrition"
      name="nutrition"
      placeholder="Nutrition"
      rows="10"
      cols="50"
    >${item.nutrition}</textarea>
    <button type="submit">post</button>
  </form>
</div>
</section>`

let context = null

export async function showEdit(ctx) {
    context = ctx
    const id = ctx.params.id
    const data = await dataService.getSingleFruit(id)
    ctx.render(editTemp(data))
}

async function submitHandler(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const {name, imageUrl, description, nutrition} = Object.fromEntries(formData)

    if(!name || !imageUrl || !description || !nutrition){
        return window.alert("Error")
    }
    const id = context.params.id
    await dataService.updateFruit(id, {name, imageUrl, description, nutrition})
    context.goTo(`/details/${id}`)
}