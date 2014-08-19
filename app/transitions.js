/**
 * Created by Faisal on 8/18/2014.
 */

export default function() {
    this.transition(
        this.fromRoute('people'),
        this.toRoute('person'),
        this.use('toLeft')
    );
    this.transition(
        this.fromRoute('person'),
        this.toRoute('people'),
        this.use('toRight')
    );
}