import { Component} from '@angular/core';
import {
	RouterLink,
	RouterOutlet,
	NavigationEnd,
	Router,
} from '@angular/router';
import { RecordButtonComponent } from '../components/features/record-button/record-button.component';
import { HeaderComponent } from '../components/header/header.component';
import { OptionsComponent } from '../components/features/options/options.component';
import { ScreenshotButtonComponent } from "../components/features/screenshot-button/screenshot-button.component";
import { PrevisualitionContentDialogComponent } from "../components/features/previsualition-content-dialog/previsualition-content-dialog.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        RouterOutlet,
        RouterLink,
        RecordButtonComponent,
        HeaderComponent,
        OptionsComponent,
        ScreenshotButtonComponent,
        PrevisualitionContentDialogComponent
    ]
})
export class AppComponent {
	showLandingPage: boolean = true;
	constructor(private router: Router) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.showLandingPage = event.url !== '/';
			}
		});
	}
}
