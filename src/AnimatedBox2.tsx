import React from 'react'
import {computeInverseValues, PossibleAnimateValues} from './computeInverseValues'
import {keyframeBuilder} from './keyframeBuilder'

interface AnimatedBoxProps {
  style?: {[key: string]: string},
  className?: string,
  from?: Partial<PossibleAnimateValues>,
  duration?: number,
  children?: React.ReactNode,
  animKey?: string,
  name?: string,
  vOrigin?: `bottom` | `top`
  hOrigin?: `bottom` | `top`
}



export class AnimatedBox2 extends React.Component<AnimatedBoxProps> {
  box: HTMLDivElement | null = null;
  state = {
    animationString: '',
    animationName: `ololo`,
    count: Date.now() + Math.floor(Math.random() * 10000),
    cloneHTML: ''
  }

  getSnapshotBeforeUpdate(prevProps: AnimatedBoxProps) {
    if (
      JSON.stringify(this.props.style) !== JSON.stringify(prevProps.style) ||
      this.props.children !== prevProps.children ||
      this.props.animKey !== prevProps.animKey
    ){
      return {
        animateValues: {
          ...this.box?.getBoundingClientRect().toJSON(),
          opacity: this.getOpacity()
        },
        cloneHTML: this.box?.querySelector('#content')?.innerHTML
      };
    }
    return null
  }

  getAnimationName():string {
    return this.state.animationName + (this.state.count - 1);
  }

  getOpacity():number {
    // return 1
    if (!this.box) return 1;
    return parseFloat(window.getComputedStyle(this.box).opacity || '1')
  }

  componentDidMount() {
    const rect = this.box?.getBoundingClientRect().toJSON();
    if (!rect || !this.props.from) return
    this.playAnimation({
      ...rect,
      opacity: this.getOpacity()
    }, {
      ...rect,
      ...this.props.from,
    })

  }

  playAnimation(first: PossibleAnimateValues, last: PossibleAnimateValues, cloneHTML?: string) {
    const inverseValues = computeInverseValues(first, last)
    const targetValues = {translateX:0, translateY: 0, scaleX:1, scaleY:1, opacity: this.getOpacity()};

    if (JSON.stringify(inverseValues) === JSON.stringify(targetValues)) return;
    const animationString = keyframeBuilder(
      inverseValues,
      targetValues,
      this.state.animationName + this.state.count
    )

    this.setState({
      animationString,
      count: this.state.count + 1,
      cloneHTML: cloneHTML || ''
    })

  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: {animateValues: PossibleAnimateValues, cloneHTML: string}) {
    if (!snapshot) return;
    const rect = this.box?.getBoundingClientRect().toJSON();
    if (!rect) return;

    this.playAnimation({
      ...rect
    }, snapshot.animateValues, snapshot.cloneHTML)

  }

  render() {
    const duration = this.props.duration??.5;

    return (
      <>
        <style>
          {this.state.animationString}
        </style>
        <div
          ref={el => this.box = el}
          className={this.props.className || ''}
          style={{
            ...this.props.style,
            transformOrigin: `${this.props.vOrigin || `top`} ${this.props.hOrigin || `left`}`,
            overflow: `hidden`,
            [this.state.animationString ? `animation` : ``]: `${this.getAnimationName()} linear ${duration}s`
          }}>
            <div style={{
              transformOrigin: `top left`,
              position: `relative`,
              [this.state.animationString ? `animation` : ``]: `${this.getAnimationName()}_inner linear ${duration}s`
            }}>
              {this.state.cloneHTML ? (
                <>
                  <div dangerouslySetInnerHTML={{
                    __html: this.state.cloneHTML
                  }} style={{
                    position: `absolute`,
                    width: `100%`,
                    height: `100%`,
                    opacity: `0`,
                    pointerEvents: `none`,
                    [this.state.animationString ? `animation` : ``]: `${this.getAnimationName()}_prevContent linear ${duration}s`
                  }}/>
                  <div style={{
                    opacity: `1`,
                    [this.state.animationString ? `animation` : ``]: `${this.getAnimationName()}_nextContent linear ${duration}s`
                  }} id="content">
                    {this.props.children}
                  </div>
                </>
              ): <div id="content">{this.props.children}</div>}


            </div>
          </div>
      </>
    )
  }
}