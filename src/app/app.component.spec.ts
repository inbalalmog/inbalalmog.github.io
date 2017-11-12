import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {InputTextModule, TreeModule, TreeNode, ButtonModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import {} from 'jasmine';
import { TreeService } from './services/tree.service';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        TreeModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [TreeService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
