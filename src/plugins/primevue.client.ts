import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Password from 'primevue/password'
import SelectButton from 'primevue/selectbutton'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import FileUpload from 'primevue/fileupload'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Panel from 'primevue/panel'
import Fieldset from 'primevue/fieldset'
import AutoComplete from 'primevue/autocomplete'
import Checkbox from 'primevue/checkbox'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ColorPicker from 'primevue/colorpicker'
import Listbox from 'primevue/listbox'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
    inputStyle: 'outlined'
  })
  nuxtApp.vueApp.use(ConfirmationService)
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('SelectButton', SelectButton)
  nuxtApp.vueApp.component('Dialog', Dialog)
  nuxtApp.vueApp.component('Card', Card)
  nuxtApp.vueApp.component('Tag', Tag)
  nuxtApp.vueApp.component('InputNumber', InputNumber)
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('Textarea', Textarea)
  nuxtApp.vueApp.component('Password', Password)
  nuxtApp.vueApp.component('Dropdown', Dropdown)
  nuxtApp.vueApp.component('Calendar', Calendar)
  nuxtApp.vueApp.component('FileUpload', FileUpload)
  nuxtApp.vueApp.component('DataTable', DataTable)
  nuxtApp.vueApp.component('Column', Column)
  nuxtApp.vueApp.component('Panel', Panel)
  nuxtApp.vueApp.component('Fieldset', Fieldset)
  nuxtApp.vueApp.component('AutoComplete', AutoComplete)
  nuxtApp.vueApp.component('Checkbox', Checkbox)
  nuxtApp.vueApp.component('TabView', TabView)
  nuxtApp.vueApp.component('TabPanel', TabPanel)
  nuxtApp.vueApp.component('ColorPicker', ColorPicker)
  nuxtApp.vueApp.component('Listbox', Listbox)
  nuxtApp.vueApp.directive('tooltip', Tooltip)
})
