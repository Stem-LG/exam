import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AvionService } from './avion.service';
import { avion } from './models/avion';


@Component({
  selector: 'app-root',
  templateUrl: "./app.template.html",
})


export class AppComponent {

  as = inject(AvionService);

  avions = null;

  constructor() {
    this.refreshTable()
  }

  refreshTable() {
    this.as.getAvions().subscribe((res) => {
      this.avions = res;
    });
  }

  

  addForm = new FormGroup({
    marque: new FormControl(),
    description: new FormControl(),
    date: new FormControl(),
  })

  edit = -1

  addSubmit() {
    this.as.addAvion(this.addForm.value).then(() => {
      this.refreshTable()
      this.addForm.reset()
      //@ts-ignore
      document.getElementById("add_dialog").close()
    })
  }

  editSubmit() {
    this.as.updateAvion(this.edit, this.addForm.value).then(() => {
      this.refreshTable()
      this.addForm.reset()
      //@ts-ignore
      document.getElementById("edit_dialog").close()

    })
  }

  delete(id) {

    if (confirm("supprimer l'avion: " + id + " ?"))
      this.as.deleteAvion(id).then(() => {
        this.refreshTable()
      });
  }

  openEdit({ id, ...a }: avion) {
    this.addForm.setValue(a)
    this.edit = id;
    //@ts-ignore
    document.getElementById("edit_dialog").showModal()
  }
}