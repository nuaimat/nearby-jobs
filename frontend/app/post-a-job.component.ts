import {Component} from '@angular/core';
import {JobPost} from './job-post';

@Component({
    selector: 'post-a-job-component',
    templateUrl: 'views/post-a-job-component.html',
    //styleUrls: ['map.component.css'],
})
export class PostAJobComponent {
    lat: number = 51.678418;
    lng: number = 7.809007;

    post = new JobPost();

    onSubmit(): void{

        console.log(this.post);

        console.log('asd');
    }

}
