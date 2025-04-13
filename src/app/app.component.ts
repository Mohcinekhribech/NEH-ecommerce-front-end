import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'neh_frontend';
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService , private cd: ChangeDetectorRef,private titleService: Title, private metaService: Meta) {}
  ngOnInit()
  {
    this.titleService.setTitle('Neh Cosmetics | Cosmétiques naturels marocains ');

    this.metaService.addTags([
      { name: 'description', content: 'Découvrez Neh Cosmetics, votre boutique en ligne de cosmétiques naturels marocains : huile d’argan bio, savon noir, ghassoul, soins du visage et du corps.' },
      { name: 'keywords', content: 'cosmétiques naturels, maroc, huile d’argan, savon noir, soins visage, produits bio, ghassoul, beurre de karité, exfoliant' },
      { name: 'author', content: 'Neh Cosmetics' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph for social sharing
      { property: 'og:title', content: 'Neh Cosmetics – Cosmétiques naturels du Maroc' },
      { property: 'og:description', content: 'Explorez nos produits de beauté 100% naturels fabriqués au Maroc. Livraison rapide et qualité garantie.' },
      { property: 'og:url', content: 'https://neh-cosmetics.com/' },
      { property: 'og:type', content: 'website' }
    ]);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
