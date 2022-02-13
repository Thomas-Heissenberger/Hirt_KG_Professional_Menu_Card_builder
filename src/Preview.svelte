<script lang="ts">

import { onMount } from "svelte";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
    //A4 format
    const DOCUMENT_WIDTH: number = 595;
    const DOCUMENT_HEIGHT: number = 842;
    let mainContent;
    let renderedContent;
    function createHiPPICanvas(w, h) {
    let ratio = window.devicePixelRatio;
    let cv = document.createElement("canvas");
    cv.width = w * ratio;
    cv.height = h * ratio;
    cv.style.width = w + "px";
    cv.style.height = h + "px";
    cv.appendChild(mainContent);
    cv.getContext("2d").scale(ratio, ratio);
    
    return cv;
}


    onMount(()=>{
        console.log(createHiPPICanvas(DOCUMENT_WIDTH, DOCUMENT_HEIGHT));
        html2canvas(createHiPPICanvas(DOCUMENT_WIDTH, DOCUMENT_HEIGHT), {allowTaint: true}).then(canvas=>{    
            canvas.style.border="1px solid lime";
            renderedContent.appendChild(canvas);
        });
        //TODO: allowTaint enables cross site images (used in dev only, can be disabled in production)
    });

    function printToPDF(){
        let doc = new jsPDF('p', 'mm', 'a4');
        doc.addImage(renderedContent.children[0].toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        doc.save('sample-file.pdf');
    }
</script>


<main>
    <div bind:this="{mainContent}" style="width:595px;height:842px;">
        <h1>Test1234</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste dolores quisquam recusandae tenetur, perspiciatis veniam reiciendis earum a nostrum itaque. Earum eum quas magni ex, rem odit cumque? Esse, placeat.</p>
        <!-- svelte-ignore a11y-missing-attribute  https://source.unsplash.com/random/200x200?sig=1 -->
        <img src="/images/icons/icon-256x256.png" crossOrigin="anonymous"/>  
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam vitae illo dolorem accusantium quis non ullam odit nisi. Neque iste temporibus enim obcaecati est totam saepe eaque non cumque exercitationem necessitatibus voluptatem excepturi harum, voluptas sed aliquid atque tempore, esse eius! Facere laboriosam maxime illum facilis pariatur, placeat autem repellat explicabo distinctio quibusdam minus corrupti provident? Similique enim laboriosam culpa magnam. Explicabo, aspernatur natus vero laudantium debitis laborum, quo tempora voluptas, sequi beatae dolor omnis consequatur hic in. Facilis sapiente tempore fugiat error. Aut incidunt quas quis iusto minus ullam enim accusamus, recusandae ipsum ipsam temporibus dolor numquam alias officiis error quod, ad nostrum fugiat hic dicta eaque, id neque soluta. Voluptas sapiente facere adipisci nihil fugiat repellendus itaque aliquam enim tempora. Asperiores, animi, temporibus nisi exercitationem vero aliquam qui in aspernatur ducimus at quo beatae, odit eligendi eaque magni vel quos. Quos alias illum amet rem blanditiis eum accusantium optio odit aspernatur maxime, sunt dignissimos aut voluptatem! Iusto possimus ipsam debitis numquam repudiandae soluta, dolor quos aspernatur veritatis quo dolorum vitae placeat tenetur expedita recusandae iste aperiam magnam tempora exercitationem voluptatem eaque culpa excepturi rerum? Unde porro, delectus et, voluptatibus doloribus atque, aspernatur animi dolor accusantium officiis alias! Voluptate blanditiis repellat aut. Commodi, perferendis voluptate dolorem, ipsam ex quas, magnam deserunt dignissimos tempora facilis aliquid nostrum adipisci ea exercitationem aspernatur. Quis, in minima pariatur at error quod quae unde, aliquid tempora repudiandae autem explicabo possimus sunt. Placeat commodi voluptas consectetur illum quaerat aperiam ab temporibus similique cumque debitis? Aspernatur quas accusamus unde perspiciatis enim sed est fugiat similique magni quae iste sunt omnis vero iusto provident officiis non, totam aliquam ad eum voluptate saepe doloremque corrupti. Cupiditate impedit vero ab deserunt perferendis ipsa dolore, nesciunt dolores, asperiores inventore magnam provident tempora pariatur? Eos non suscipit laudantium facere quidem iste distinctio libero velit reprehenderit quis? Nostrum molestias ullam perspiciatis quidem ea soluta inventore cum iste, magnam aliquid alias, repellendus nihil aliquam illum doloribus tempora labore esse eius sed iure, excepturi tempore ratione dicta! Quasi nisi aspernatur optio expedita quas ut inventore doloremque, labore sed recusandae quod voluptatum beatae perferendis est veniam quos, temporibus nostrum cupiditate id ab aut dolore ipsam at? Reprehenderit magni ipsum deleniti expedita dicta. Eos quam quidem rem adipisci! Commodi minima dicta, corporis autem quis blanditiis distinctio odit nulla molestiae dolor vitae delectus dolorem id enim dolores numquam, fuga voluptate ad fugit temporibus modi illum dolorum. Expedita doloribus quasi laboriosam laudantium officiis nihil vitae cum! Officia laborum animi omnis voluptatibus beatae ullam blanditiis aliquam dolores, corrupti id illum sit delectus eum eaque cumque facere, vel quia qui laudantium sunt! Culpa voluptates, labore cum ipsum ipsam quod a alias fugit inventore cupiditate tempore officia eveniet ad nihil vel architecto ullam nisi nulla id dolores deserunt odio perferendis enim. Labore, magnam porro? Numquam, deleniti voluptate. Voluptates laboriosam, saepe quaerat beatae consequuntur provident fugiat sapiente ut veniam magni temporibus minus harum magnam dignissimos nostrum quia sunt earum non eius. Unde velit ipsa quisquam aut doloribus a nisi, illum dolorum reiciendis consectetur quos distinctio et quibusdam perspiciatis alias animi quae enim minima est perferendis commodi officia voluptate praesentium. Consequuntur rem perspiciatis tenetur sit quas dignissimos officiis, quod dolores, sint exercitationem hic accusamus necessitatibus minus? Perspiciatis distinctio hic assumenda voluptate quos fugiat velit vel impedit consequatur, commodi labore totam similique omnis ex sint eum inventore sit molestias ut necessitatibus eveniet accusamus? Perspiciatis soluta animi illo suscipit impedit? Exercitationem tempore non, reiciendis ducimus, voluptas nisi, facere doloremque quod provident sequi vitae. Iure quasi accusantium asperiores eius velit veniam voluptates iusto fuga vero provident, nisi vitae cupiditate ducimus, numquam natus accusamus praesentium harum non!</p>  
    </div>
    <button on:click="{printToPDF}">To PDF</button>
    <div bind:this="{renderedContent}"></div>
</main>

<style>
    main{
        height: 50vh;
        border: 0.1rem solid grey;
    }
</style>
