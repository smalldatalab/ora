/**
 * Created by Faisal on 8/18/2014.
 */

export default function() {
    this.transition(
        this.toRoute('users'),
        this.use('toRight')
    );
    this.transition(
        this.fromRoute('users'),
        this.toRoute('users.add'),
        this.use('toRight'),
        this.reverse('toLeft')
    );
    this.transition(
        this.toRoute('user'),
        this.use('toLeft')
    );
    this.transition(
        this.toRoute('user.date'),
        this.use('toLeft'),
        this.reverse('toRight')
    );
    this.transition(
        this.toRoute('user.details'),
        this.use('toLeft'),
        this.reverse('toRight')
    );

    // attempting to get transition animation to/from details to work...
    this.transition(
      this.fromRoute('user.date'),
      this.toRoute('user.details'),
      this.use('toLeft'),
      this.reverse('toRight')
    );

    this.transition(
        this.fromRoute('login'),
        this.toRoute('connect'),
        this.use('toRight')
    );
    this.transition(
        this.fromRoute('connect'),
        this.toRoute('users'),
        this.use('toLeft')
    );
    this.transition(
        this.toRoute('login'),
        this.use('fade')
    );

    // loading transition
    this.transition(
        this.toRoute('loading'),
        this.use('fade')
    );

    // and don't do any animation when we first visit a page
    this.transition(
        this.fromRoute(null),
        this.use('fade', { duration: 0 })
    );
}
