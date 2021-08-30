import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-navlink',
  templateUrl: './navlink.component.html',
  styleUrls: ['./navlink.component.scss']
})
export class NavlinkComponent implements OnInit {
  @Input() link!: string
  constructor() {}

  ngOnInit(): void {}
}
