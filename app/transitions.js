/**
 * Created by Faisal on 8/18/2014.
 */

export default function() {
    this.transition(
        this.fromRoute('person'),
        this.toRoute('people.index'),
        this.use('toRight')
    );
    this.transition(
        this.fromRoute('people.add'),
        this.toRoute('people.index'),
        this.use('toRight')
    );
    this.transition(
        this.toRoute('person'),
        this.use('toLeft')
    );
    this.transition(
        this.toRoute('people.add'),
        this.use('toLeft')
    );

    // and don't do any animation when we first visit a page
    this.transition(
        this.fromRoute(null),
        this.use('fade', { duration: 0 })
    );
}